import { Avatar, Card, CardHeader } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Player(props) {
    return (
        <Card sx={{ width: '100%', height: '100%' }}>
        <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: (props.color === 'white') ? grey[300] : grey[900] }} aria-label="player">
            </Avatar>
            }
            title={props.name}
            subheader={props.rating}
        />
        </Card>
    )
}