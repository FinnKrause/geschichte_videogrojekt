import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./BerlinPage.css";

interface Props {
    TimeLineEvents: { date: string, header: string, content: string }[] | undefined
}

const BerlinPage: React.FC<Props> = ({ TimeLineEvents }: Props): JSX.Element => {
    return (
        <div id="BerlinWrapper">
            <div className="BerlinTimeLine">
                <ul>
                    {TimeLineEvents?.map(((i, idx) => (
                        <li key={idx}>
                            <div className="BerlinTimeLine-content">
                                <h3 className="date">{i.date}</h3>
                                <h1>{i.header}</h1>
                                <p>{i.content}</p>
                            </div>
                        </li>
                    )))}
                </ul>
            </div>
        </div>
    )
}

export default BerlinPage;