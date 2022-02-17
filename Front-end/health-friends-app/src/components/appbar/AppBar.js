import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link,useNavigate } from 'react-router-dom';
import logo from './logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {AuthContext,} from '../account/Auth'
import { useContext } from 'react'
import FormDialog from '../common/FormDialog'


const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const auth = useContext(AuthContext)
  const {dialog,setDialog}=props

  const navigate=useNavigate()
  function handleLogin(){
    setAnchorElUser(null);
    setDialog('login')
  }
  function handleSignup(){
    setAnchorElUser(null);
    setDialog('signup')
  }
  function logout(){
    navigate('/')
    auth.logout()
    setAnchorElUser(null);
  }
  function changePw(){
    setDialog('changePw')
    setAnchorElUser(null);
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div position="static" style={{ backgroundColor:'#D3E4CD', boxShadow:'none', paddingBottom:'1rem', paddingTop:'1rem'}}>
      <Container maxWidth="lg" sx={{backgroundColor:'#D3E4CD'}}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to='/'>
              <img src={logo} alt="logo" style={{height: '7rem'}}/>
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} style={{color:'black'}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              // color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" >
                  <Link to='/rooms' style={{color:'black', fontSize:'1.5rem', fontWeight:'bold', textDecoration:'none' }}>
                    헬스장
                  </Link></Typography>
              </MenuItem><br/>
              <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link to='/record' style={{color:'black', fontSize:'1.5rem', fontWeight:'bold', textDecoration:'none'}}>
                    운동기록
                  </Link></Typography>
              </MenuItem><br/>
              <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  <Link to='/diet' style={{color:'black', fontSize:'1.5rem', fontWeight:'bold', textDecoration:'none' }}>
                    식단
                  </Link></Typography>
              </MenuItem><br/>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                <Link to='/boards' style={{color:'black', fontSize:'1.5rem', fontWeight:'bold', textDecoration:'none' }}>
                  HELP DESK
                </Link></Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, border:'none' }}
          >
            <Link to='/'  >
              <img src={logo} alt="logo" style={{height: '7rem', border:'none'}}/>
            </Link>
          </Typography>
          {auth.user &&
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to='/rooms' style={{ textDecoration:'none', marginRight:'3rem', marginLeft:'3rem'}}>
                <Button
                  // onClick={handleCloseNavMenu}
                  style={{ my: 3, color: 'black', display: 'block', fontSize:'2rem', fontWeight:'bold' }}>
                  헬스장
                </Button>
              </Link>
              <Link to='/record' style={{ textDecoration:'none', marginRight:'3rem'}}>
                <Button
                  // onClick={handleCloseNavMenu}
                  style={{ my: 3, color: 'black', display: 'block', fontSize:'2rem', fontWeight:'bold'  }}>
                  운동기록
                </Button>
              </Link>
              <Link to='/diet' style={{ textDecoration:'none', marginRight:'3rem'}}>
                <Button
                  // onClick={handleCloseNavMenu}
                  style={{ my: 3, color: 'black', display: 'block', fontSize:'2rem', fontWeight:'bold' }}>
                  식단
                </Button>
              </Link>
              <Link to='/boards' style={{ textDecoration:'none'}}>
                <Button
                  // onClick={handleCloseNavMenu}
                  style={{ my: 3, color: 'black', display: 'block', fontSize:'2rem', fontWeight:'bold' }}>
                  HELP DESK
                </Button>
              </Link>
            </Box>
          }
          {!auth.user &&
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to='/boards' style={{ textDecoration:'none', marginLeft:'3rem'}}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 3, color: 'black', display: 'block', fontSize:'2rem', fontWeight:'bold' }}>
                  HELP DESK
                </Button>
              </Link>
            </Box>
          }
            
          <Box style={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} style={{ p: 0 }}>
              <FontAwesomeIcon icon={faUserCircle} size="3x" color="black" />
            </IconButton>
            <Menu
              style={{ marginTop: '45px',   }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >    
              {!auth.user && <div>
                <MenuItem onClick={handleLogin} style={{fontSize:'1.5rem', fontWeight:'bold'}}>
                  로그인
                </MenuItem><br/>
                <MenuItem onClick={handleSignup} style={{fontSize:'1.5rem', fontWeight:'bold'}}>
                  회원가입
                </MenuItem></div>
               }
              {auth.user && <div>
                <MenuItem onClick={changePw} style={{fontSize:'1.5rem', fontWeight:'bold'}}>
                  비밀번호 변경
                </MenuItem><br/>
                <MenuItem onClick={logout} style={{fontSize:'1.5rem', fontWeight:'bold'}}>
                  로그아웃
                </MenuItem></div>
               }
              </Menu>
          </Box>
              
        </Toolbar>
      </Container>
      <FormDialog setDialog={setDialog} dialog={dialog} />
    </div>
  );
};
export default ResponsiveAppBar;