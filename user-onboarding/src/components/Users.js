import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
      minWidth: 500,
      maxWidth: 500,
      margin: 20,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


const Users = (props) => {
    const classes = useStyles();
    const {users, deleteUser} = props;
    return (
        <div>
            {users.map(user => {
                return <Card key={user.id} className={classes.card}>
                            <CardContent>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                                <Typography variant="h4" component="h1">Name: {user.name}</Typography>
                                <Typography variant="h6" component="h4">Email: {user.email}</Typography>
                                <Typography variant="subtitle1" component="p">Password: {user.password}</Typography>
                            </CardContent>
                        </Card>
            })}
        </div>
    )
}

export default Users