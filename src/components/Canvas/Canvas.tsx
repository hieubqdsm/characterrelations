import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Mindmap, Node as MindmapNode, Relationship } from '../../types/mindmap';
import { useStore } from '../../store/useStore';
import { CharacterNode } from './CharacterNode';
import { CharacterEdge } from './CharacterEdge';

const nodeTypes = {
  character: CharacterNode,
};

const edgeTypes = {
  character: CharacterEdge,
};

interface CanvasProps {
  mindmap: Mindmap;
}

export const Canvas: React.FC<CanvasProps> = ({ mindmap }) => {
  const { nodes: storeNodes, relationships: storeRelationships, addNode, updateNode, addRelationship } = useStore();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Convert mindmap nodes to ReactFlow nodes
  const convertToReactFlowNodes = useCallback((mindmapNodes: MindmapNode[]): Node[] => {
    return mindmapNodes.map(node => ({
      id: node.id,
      type: 'character',
      position: node.position,
      data: {
        ...node,
        onUpdate: (updates: Partial<MindmapNode>) => updateNode(node.id, updates),
      },
    }));
  }, [updateNode]);

  // Convert mindmap relationships to ReactFlow edges
  const convertToReactFlowEdges = useCallback((relationships: Relationship[]): Edge[] => {
    return relationships.map(rel => ({
      id: rel.id,
      source: rel.source,
      target: rel.target,
      type: 'character',
      data: {
        ...rel,
      },
    }));
  }, []);

  // Initialize nodes and edges
  React.useEffect(() => {
    setNodes(convertToReactFlowNodes(storeNodes));
    setEdges(convertToReactFlowEdges(storeRelationships));
  }, [storeNodes, storeRelationships, convertToReactFlowNodes, convertToReactFlowEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      const newRelationship: Relationship = {
        id: `rel_${Date.now()}`,
        source: params.source,
        target: params.target,
        type: 'default',
      };
      addRelationship(newRelationship);
    },
    [addRelationship]
  );

  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      updateNode(node.id, { position: node.position });
    },
    [updateNode]
  );

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="top-right">
          <button
            onClick={() => {
              const newNode: MindmapNode = {
                id: `node_${Date.now()}`,
                name: 'New Character',
                position: { x: 100, y: 100 },
              };
              addNode(newNode);
            }}
          >
            Add Character
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}; 