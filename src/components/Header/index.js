import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import shortid from 'shortid';
import { Button, Select, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { paths } from 'constants/index';
import { useWindowSize } from 'hooks/index';
import { authActions, currencyActions } from 'store/actions';
import { authSelectors, currencySelectors } from 'store/selectors';

import styles from './Header.scss';

import Logo from '../Logo';
import Bucket from '../Bucket';
import FlexLink from '../FlexLink';
import ShopList from '../ShopList';

const { Option } = Select;

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.selectUser);
  const token = useSelector(authSelectors.selectToken);
  const currency = useSelector(currencySelectors.selectCurrency);
  const currentCurrency = useSelector(currencySelectors.selectCurrentCurrency);

  const { isTablet, isMobile } = useWindowSize();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    if (visible) {
      setVisible(!visible);
    } else {
      setVisible(true);
    }
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const handleChange = (value) => {
    dispatch(currencyActions.setCurrentCurrency(value));
  };

  const renderOptions = () => {
    return Object.keys(currency).map((item) => (
      <Option key={shortid.generate()} value={item}>
        {item}
      </Option>
    ));
  };

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.header_wrapper}`}>
          <Logo />
          {(isTablet && !isMobile) || (!isTablet && isMobile) ? (
            <>
              <MenuOutlined
                onClick={showDrawer}
                style={{ fontSize: 32, color: 'white' }}
              />
              <Drawer
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                className={styles.drawer}
              >
                {token && !isEmpty(user) ? (
                  <>
                    <div
                      className={styles.full_name}
                    >{`${user.name} ${user.surname}`}</div>
                    <div
                      onClick={handleLogout}
                      role="button"
                      className={styles.logout_mobile}
                    >
                      Logout
                    </div>
                    <ShopList />
                    <Select
                      defaultValue={currentCurrency}
                      style={{ width: 80 }}
                      onChange={handleChange}
                    >
                      {renderOptions()}
                    </Select>
                  </>
                ) : (
                  <div className={styles.drawer}>
                    <FlexLink to={paths.login}>Login</FlexLink>
                    <FlexLink to={paths.register}>Registration</FlexLink>
                    <Select
                      defaultValue={currentCurrency}
                      style={{ width: 80 }}
                      onChange={handleChange}
                    >
                      {renderOptions()}
                    </Select>
                  </div>
                )}
              </Drawer>
            </>
          ) : (
            <nav>
              {token && !isEmpty(user) ? (
                <>
                  <p className={styles.header_user_name}>{user.name}</p>
                  <p className={styles.header_user_name}>{user.surname}</p>
                  <Button onClick={handleLogout}>Logout</Button>
                  <ShopList />
                </>
              ) : (
                <>
                  <Button>
                    <FlexLink to={paths.login}>Login</FlexLink>
                  </Button>
                  <Button>
                    <FlexLink to={paths.register}>Registration</FlexLink>
                  </Button>
                </>
              )}
              <Select
                defaultValue={currentCurrency}
                style={{ width: 80 }}
                onChange={handleChange}
                className={styles.select}
              >
                {renderOptions()}
              </Select>
              <Bucket />
            </nav>
          )}
        </div>
      </header>
      <div className={styles.sceleton} />
    </>
  );
};

export default Header;
