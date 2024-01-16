import { Link } from 'react-router-dom';
import { Button, Box, AppBar, Toolbar, Typography, TextField } from '@mui/material';
import '../index.css';
import useAxios from '../services/useAxios';


function Header() {
    // const {data} = useAxios('http://localhost:3000/books');
    const handleBooksClick = () => {
        window.location.reload(); // reload the page
      };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" onClick={handleBooksClick} sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to="/"
                            
                            sx={{
                                mr: 2,
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        > Books
                        </Typography>
                    </Typography>
                    <Button color="inherit" variant="text" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" variant="text" component={Link} to="/addnew">
                        Add New
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
