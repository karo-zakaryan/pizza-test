import React, { useState } from 'react';
import shortid from 'shortid';
import { isEmpty } from 'lodash';
import { Button, Card } from 'antd';
import { useSelector } from 'react-redux';

import { useWindowSize } from 'hooks/index';
import { authSelectors } from 'store/selectors';

import styles from './ShopList.scss';

import FlexModal from '../FlexModal';

const { Meta } = Card;

const ShopList = () => {
  const user = useSelector(authSelectors.selectUser);
  const { isTablet, isMobile } = useWindowSize();

  const [visible, setVisible] = useState(false);

  const data =
    !isEmpty(user) && !isEmpty(user.lastPurchases)
      ? Object.entries(user.lastPurchases)
      : [];

  const handleShow = () => {
    if (user.lastPurchases) {
      setVisible(true);
    }
  };

  return (
    <>
      {(isTablet && !isMobile) || (!isTablet && isMobile) ? (
        <div
          onClick={() => setVisible(true)}
          role="button"
          className={styles.purchase_mobile}
        >
          Latest Purchases
        </div>
      ) : (
        <Button onClick={handleShow} className={styles.purchase}>
          Latest Purchases
        </Button>
      )}

      <FlexModal visible={visible} setVisible={setVisible}>
        {data.length
          ? data.map((item) => (
              <div key={shortid.generate()}>
                <h3 className={styles.sub_title}>{item[0]}</h3>
                <div key={item[0]} className={styles.border_bottom}>
                  <div className={styles.column}>
                    {item[1].bucket.map((el) => (
                      <Card
                        key={shortid.generate()}
                        hoverable
                        style={{ width: 160 }}
                        cover={<img src={el.image} alt="logo" />}
                        className={styles.marger}
                      >
                        <Meta
                          title={el.name}
                          description={`${el.qty}  ${el.choose.name} by ${el.choose.price} ${item[1].currency}`}
                        />
                      </Card>
                    ))}
                  </div>
                  <div className={styles.total_price}>
                    Total Price {item[1].total} &nbsp;
                    {item[1].currency}
                  </div>
                </div>
              </div>
            ))
          : null}
      </FlexModal>
    </>
  );
};

export default ShopList;
