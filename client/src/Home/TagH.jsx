import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTags } from '../contexts/TagContext';
import { Typography, Box, Card, CardContent, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
        padding: '10px'
    },
    card: {
        margin: '10px'
    }
});

export default function TagH() {
    const classes = useStyles();
    const { tags } = useTags();

    if (tags.length === 0) {
        return <p>No tags to display</p>;
    }

    return (
        <Box className={classes.root}>
            {tags.map((tag) => (
                <Card className={classes.card} key={tag.tag}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {tag.tag}
                        </Typography>
                        <Typography>
                            {tag.count} Posts
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}