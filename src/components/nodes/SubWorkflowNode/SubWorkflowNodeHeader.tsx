import { Component, createSignal } from 'solid-js';
import { Node, useSolidFlowyStoreById } from 'solid-flowy/lib';
import { useI18n } from '@amoutonbrady/solid-i18n';

import IconButton from '../../common/IconButton/IconButton';
import Menu from '../../common/Menu/Menu';
import MenuItem from '../../common/Menu/MenuItem';
import ForumIcon from '../../icons/ForumIcon';
import MoreHorizIcon from '../../icons/MoreHorizIcon';
import './SubWorkflowNodeHeader.scss';

interface SubWorkflowNodeHeaderProps {
  node: Node;
  storeId: string;
}

const SubWorkflowNodeHeader: Component<SubWorkflowNodeHeaderProps> = (props) => {
  const [t] = useI18n();
  const [state, { deleteElementById }] = useSolidFlowyStoreById(props.storeId);
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  let anchorEl: HTMLButtonElement;

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMenuClickAway = () => {
    closeMenu();
  };

  const deleteNode = () => {
    closeMenu();

    deleteElementById(props.node.id);
  };

  return (
    <header class="sub-workflow-node-header">
      <ForumIcon class="sub-workflow-node-header__leading-icon" />
      <h3 class="sub-workflow-node-header__title">{t('subWorkflow')}</h3>
      <IconButton
        ref={anchorEl}
        class="sub-workflow-node-header__more-options-button"
        aria-label="more options"
        onClick={openMenu}
      >
        <MoreHorizIcon class="intent-node-header__more-options-button__icon" />
      </IconButton>
      <Menu anchorEl={anchorEl} isOpen={isMenuOpen()} onClose={handleMenuClickAway}>
        <MenuItem onClick={deleteNode}>{t('delete')}</MenuItem>
      </Menu>
    </header>
  );
};

export default SubWorkflowNodeHeader;
