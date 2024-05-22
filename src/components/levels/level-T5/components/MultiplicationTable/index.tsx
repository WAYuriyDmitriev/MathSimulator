import React, { useState } from 'react';

import './index.scss';
import CrossIcon from './CrossIcon';

export default function MultiplicationTable() {
    const [isShowTable, setIsShowTable] = useState(false);
    return (
        <>
            <div className="multiplication-table-container d-flex ms-3" onMouseOut={() => setIsShowTable(false)}
                 onMouseOver={() => setIsShowTable(true)}>
                <CrossIcon />
                <div className="ps-3">Таблица умножения</div>

                {
                    isShowTable &&
                    <div className="shadow-box multiplication-table flex-column">
                        <div className="multiplication-table-row">
                            {
                                Array.from(Array(5)).map((_, leftMul) => (
                                    <div>
                                        {
                                            Array.from(Array(10)).map((_, rightMul) => (
                                                <div>
                                                    <span>{leftMul + 1}</span><span>*</span><span>{rightMul + 1}</span><span>=</span><span>{(rightMul + 1) * (leftMul + 1)}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className="multiplication-table-row">
                            {
                                Array.from(Array(5)).map((_, leftMul) => (
                                    <div>
                                        {
                                            Array.from(Array(10)).map((_, rightMul) => (
                                                <div>
                                                    <span>{leftMul + 6}</span><span>*</span><span>{rightMul + 1}</span><span>=</span><span>{(rightMul + 1) * (leftMul + 6)}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>

        </>
    );
}