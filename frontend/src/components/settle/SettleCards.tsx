import React from 'react';
import { Settlement } from '../../entities/Settlement.entity';

interface SettleCardProps {
  settlements: Settlement[];
}

const SettleCards: React.FC<SettleCardProps> = ({ settlements }) => (
  <div className="p-3">
    <div className="row">
      {settlements.map((settlement) => (
        <div className="col-xl-3 pb-3">
          <div className="card">
            <h5 className="card-header">{settlement.user.username}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                {settlement.settleDifference < 0
                  ? `Has to pay: ${settlement.settleDifference * -1}`
                  : `Will receive: ${settlement.settleDifference}`}{' '}
                CHF
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SettleCards;
