import { Link, Typography } from "@mui/material";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link target="_blank" color="inherit" href="https://github.com/PlayLiveChess/">
            PlayLiveChess
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

export default Copyright;