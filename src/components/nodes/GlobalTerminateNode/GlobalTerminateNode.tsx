import { Component, createMemo, Show } from 'solid-js';
import { NodeComponentProps } from 'solid-flowy/lib/components/Nodes/wrapNode';

import ExtendedNodeContainer from '../NodeContainer/ExtendedNodeContainer';
import { useStatusStore } from '../../../store/status.store';
import ProblemPopover from '../../problemPopover/ProblemPopover';
import './GlobalTerminateNode.scss';

const GlobalTerminateNode: Component<NodeComponentProps> = (props) => {
  const [statusState] = useStatusStore();
  const problematicNode = createMemo(() => statusState.problematicNodes.find((pN) => pN.id === props.node.id));

  return (
    <ExtendedNodeContainer isHandleDisabled node={props.node} storeId={props.storeId}>
      <div classList={{ 'global-terminate-node--selected': !!props.node.isSelected }}>
        <div class="global-terminate-node__container">
          <div class="global-terminate-node__container__child" />
        </div>
        <Show when={statusState.shouldShowInvalidNodes && problematicNode()}>
          <ProblemPopover status={problematicNode().status} message={problematicNode().message} />
        </Show>
      </div>
    </ExtendedNodeContainer>
  );
};

export default GlobalTerminateNode;
