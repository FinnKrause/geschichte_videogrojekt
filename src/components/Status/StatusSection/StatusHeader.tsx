import React from "react";


interface Props {
    title: string
}

const StatusHeader: React.FC<Props> = ({ title }: Props): JSX.Element => {
    return (
        <div className="TopBanner">
            <h1 className="FortschrittLabel">{title}</h1>
        </div>
    )
}

export default StatusHeader;