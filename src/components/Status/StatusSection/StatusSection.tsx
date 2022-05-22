import React, { ReactNode } from "react";
import StatusHeader from "./StatusHeader";

interface Props {
    children: ReactNode;
    AdditionalWrapperClasses?: string[]
    contentClasses?: string[]
    HeaderName: string

}

const StatusSection: React.FC<Props> = (Props: Props): JSX.Element => {
    if (Props.AdditionalWrapperClasses) return <div className={Props.AdditionalWrapperClasses.join(" ")}>{givePayload(Props)}</div>
    else return <>{givePayload(Props)}</>
}

const givePayload = (Props: Props) => {
    return <>
        <StatusHeader title={Props.HeaderName}></StatusHeader>
        <div className={`${Props.contentClasses?.join(" ")} contentArea`}>
            {Props.children}
        </div>
    </>
}

export default StatusSection;