import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';

import { noop } from 'utils/index';
import { useWindowSize } from 'hooks/index';

import styles from '../Pizza/Pizza.scss';

const FlexModal = ({ children, visible, setVisible }) => {
  const { isMobile, isTablet, isDesktop, isLargeTablet } = useWindowSize();

  const useSizes = () => {
    if (isTablet || isMobile) {
      return 90;
    }
    if (isDesktop) {
      return 60;
    }
    if (isLargeTablet) {
      return 70;
    }
    return 50;
  };

  return (
    <Modal
      centered
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      width={`${useSizes()}%`}
      footer={null}
      closeIcon={<CloseCircleOutlined className={styles.cross} />}
    >
      {children}
    </Modal>
  );
};

FlexModal.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node,
  setVisible: PropTypes.func,
};

FlexModal.defaultProps = {
  visible: false,
  children: null,
  setVisible: noop(),
};

export default FlexModal;
