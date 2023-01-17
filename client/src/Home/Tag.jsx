import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useTags } from '../contexts/TagContext';
import { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
    margin: '10px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Tag() {
  const classes = useStyles();
  const { tags } = useTags(); // assumed the data is an array of objects that has properties of `tag` and `count`


  if (tags.length === 0) {
      return <p>No tags to display</p>;
  }
  return (
    <div>
      {tags.map((tag) => (
        <Card className={classes.root} key={tag.tag}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Popular Tag
            </Typography>
            <Typography variant="h5" component="h2">
              {tag.tag}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            {tag.count} Posts
            </Typography>
            </CardContent>
            </Card>
            ))}
            </div>
            );
            }
// simple way

/*import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useTags } from '../contexts/TagContext';
import { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
    margin: '10px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Tag() {
  const classes = useStyles();
  const { tags } = useTags(); // assumed the data is an array of objects that has properties of `tag` and `count`


  if (tags.length === 0) {
      return <p>No tags to display</p>;
  }
  return (
    <div>
      {tags.map((tag) => (
        <Card className={classes.root} key={tag.tag}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Popular Tag
            </Typography>
            <Typography variant="h5" component="h2">
              {tag.tag}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            {tag.count} Posts
            </Typography>
            </CardContent>
            </Card>
            ))}
            </div>
            );
            }
*/

//horisental way

/*import React from 'react';
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

export default function Tag() {
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
}*/