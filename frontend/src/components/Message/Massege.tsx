import { Contaner } from "./style";

export interface MessageProps {
    mess: string;
}
export function Message(props: MessageProps) {
    return <Contaner>{props.mess}</Contaner>;
}
