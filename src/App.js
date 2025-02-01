import { useEffect, useRef, useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import { fadeIn } from './variants';
import { Alert, Avatar, AvatarGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { NoteAltOutlined } from '@mui/icons-material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';




const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

const avatars = [
  './0x0.webp',
  './s-l1200.jpg',
  './shrek-5-mike-myers.avif',
  './Cute-Baby-Spiderman-Cartoon-Nursery-Poster-55420126-1.png',
  './png-clipart-star-wars-luke-skywalker-using-lightsaber-illustration-anakin-skywalker-luke-skywalker-star-wars-ig-88-bossk-cartoon-future-soldier-cartoon-character-comics.png',
  './91LheZyvuFL.jpg',
  './100506-ironman2-hmed.webp',
]



const RandomId = (length) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return '#' + Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};
const checkDate = (dateString) => {
  const today = new Date();
  const date = new Date(dateString);
  
  // Normalize both dates by setting the time to 00:00:00 to ignore time differences
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  
  if (date.getTime() === today.getTime()) {
    return "Today";
  }
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Set to tomorrow's date
  
  if (date.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  }
  
  return dateString; // Return original date if it's neither today nor tomorrow
};



















function App() {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem('MyItems')) || [
      {"id":"#1a2b3c4d5e6f","name":"Go fishing and hunting in the evening","time":"13:00","date":"2025-02-05","complete":true},
      {"id":"#2g3h4i5j6k7l","name":"Attend a morning yoga session","time":"07:00","date":"2025-02-06","complete":true},
      {"id":"#3m4n5o6p7q8r","name":"Finish reading a novel","time":"20:00","date":"2025-02-07","complete":false},
      {"id":"#4s5t6u7v8w9x","name":"Visit the museum","time":"11:00","date":"2025-02-08","complete":false},
      {"id":"#5y6z7a8b9c0d","name":"Grocery shopping","time":"16:00","date":"2025-02-09","complete":false},
      {"id":"#6e7f8g9h0i1j","name":"Go for a bike ride","time":"14:30","date":"2025-02-10","complete":false},
      {"id":"#7k8l9m0n1o2p","name":"Watch a documentary","time":"19:00","date":"2025-02-11","complete":false},
      {"id":"#8q9r0s1t2u3v","name":"Plan weekend activities","time":"12:00","date":"2025-02-12","complete":false},
      {"id":"#9w0x1y2z3a4b","name":"Cook a new recipe","time":"18:30","date":"2025-02-13","complete":false},
      {"id":"#0c1d2e3f4g5h","name":"Attend a networking event","time":"17:00","date":"2025-02-14","complete":false},
      {"id":"#1i2j3k4l5m6n","name":"Go for a morning run","time":"06:00","date":"2025-02-15","complete":false},
      {"id":"#2o3p4q5r6s7t","name":"Meditation and relaxation","time":"20:30","date":"2025-02-16","complete":false},
      {"id":"#3u4v5w6x7y8z","name":"Clean and organize workspace","time":"10:00","date":"2025-02-17","complete":false},
      {"id":"#4a5b6c7d8e9f","name":"Call an old friend","time":"15:00","date":"2025-02-18","complete":false},
      {"id":"#5g6h7i8j9k0l","name":"Start a new project","time":"09:30","date":"2025-02-19","complete":false}    
    ]; // Load existing items from localStorage or default to []
  });
  const [darkMode, setDarkMode ] = useState(() => {
    return JSON.parse(localStorage.getItem('isDarkMode')) || false;
  });
  const [search, setSearch] = useState('');  
  const [filteredItems, setFilteredItems ] = useState([]);  
  const [userName, setUserName] = useState('');  
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[Math.floor(Math.random() * avatars.length)]);  
  const [storedAvatar, setStoredAvatar] = useState('');  
  const [open, setOpen] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);
  const [newItem, setNewItem] = useState({
    id: RandomId(24),
    name: '',
    time: '',
    date: '',
    complete: false,
  });
  const [newUser, setNewUser] = useState({
    id: RandomId(14),
    name: '',
    profilePic: selectedAvatar,
    date: new Date()
  }); 
  
  const handleChange = (e) => {
    setNewUser(prev => ({
      ...prev,
      name: e.target.value
    }));
  };
  const handleItemNameChange = (e) => {
    setNewItem(prev => ({
      ...prev,
      name: e.target.value
    }));
  };
  const handleDateChange = (e) => {
    setNewItem(prev => ({
      ...prev,
      date: e.target.value
    }));
  };
  const handleTimeChange = (e) => {
    setNewItem(prev => ({
      ...prev,
      time: e.target.value
    }));
  };



  const user = JSON.parse(localStorage.getItem('User'));
  useEffect(() => {
    if(user){
      setUserName((user?.name).trim());
      setStoredAvatar(user?.profilePic);
    } else {
      setUserName('');
      setStoredAvatar('');
    }
  }, [newUser, user])
  








  
  const handleClickAdd = () => {
    if(userName !== ''){
      setShowItemModal(true)
    } else {
      setOpen(true);
    }
  };


  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseItem = () => {
    successAlert('New item added successfully!', false)
    setShowItemModal(false);
  };



  // const handleSubmit = (event) => {
  //   event.preventDefault();
  
  //   // Create a new array with the new item added
  //   const updatedItems = [...items, newItem];
  
  //   // Update localStorage
  //   localStorage.setItem('MyItems', JSON.stringify(updatedItems));
  
  //   // Update state
  //   setItems(updatedItems);
  
  //   console.log(updatedItems);
  //   handleCloseItem();
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Generate a new unique ID for each new item
    const newItemWithId = {
      ...newItem,
      id: RandomId(24) // Generate a fresh ID before adding
    };
  
    // Update state and localStorage
    const updatedItems = [...items, newItemWithId];
    setItems(updatedItems);
    localStorage.setItem('MyItems', JSON.stringify(updatedItems));
  
    // Reset newItem for next input
    setNewItem({
      id: RandomId(24), // Generate a new ID immediately for the next input
      name: '',
      time: '',
      date: '',
      complete: false
    });
  
    handleCloseItem();
  };
  
    // Handle checkbox toggle
    const toggleComplete = (id) => {
      setItems(prevItems => {
        const updatedItems = prevItems.map(item =>
          item.id === id ? { ...item, complete: !item.complete } : item
        );
        localStorage.setItem('MyItems', JSON.stringify(updatedItems));
        return updatedItems;
      });
    };
    



    const [noOfVisits, setNoOfVisits] = useState(() => {
      return parseInt(localStorage.getItem('visits')) || 0;
    });
    
    useEffect(() => {
      if (noOfVisits === 0) {
        // First visit: Initialize visits count and default items
        localStorage.setItem('visits', 1);
      } else {
        // Increment visit count for returning users
        const updatedVisits = noOfVisits + 1;
        setNoOfVisits(updatedVisits);
      }
    }, []); // Run only on mount
    
    
    




    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
      const updateClock = () => {
        const now = new Date();
        const formattedTime = now
          .toLocaleString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
  
        setCurrentTime(formattedTime);
      };
  
      updateClock(); // Initial update
      const interval = setInterval(updateClock, 1000); // Update every second
  
      return () => clearInterval(interval); // Cleanup on unmount
    }, []);
  

const [userProfile, setUserProfile] = useState('./s-l1200.jpg')
const [showProfile, setShowProfile] = useState(false)
const [completedItems, setCompletedItems] = useState(0)
const [success, setSuccess] = useState(-200)
const [successMessage, setSuccessMessage] = useState('')
const [deleteItemId, setDeleteItemId] = useState(null);
const [audioSrc, setAudioSrc] = useState(null);
const audioRef = useRef(null);
    // Convert file to blob and create a URL





    
useEffect(() => {
  const savedImage = localStorage.getItem('todoImage');
  if (savedImage) {
      setUserProfile(savedImage)
  }
}, [])

useEffect(() => {
  const completed = items.filter((item, index)=> item.complete);
  setCompletedItems(completed.length)
}, [items])

function successAlert(name, completed) {
  setSuccess(-200);
  if(!completed){
  setSuccess(20)
  setSuccessMessage(name)  
  setAudioSrc(name.includes('deleted') ? './pop-39222.mp3' : './success.mp3');
  setTimeout(() => {
    setSuccess(-200);
    setAudioSrc(null);
  }, 5000);
  }
}
useEffect(() => {
  if (audioSrc && audioRef.current) {
    audioRef.current.play();
  }
}, [audioSrc]);



const handleSearch = (searchParam) => {
  setSearch(searchParam); // Ensure the state updates
  const filteredSearch = items.filter((item) =>
    item.name.toLowerCase().includes(searchParam.toLowerCase())
  );
  setFilteredItems(filteredSearch);
};
const today = new Date();
today.setHours(0, 0, 0, 0);

const sortedItems = items
.filter(item => item.complete !== true)

.sort((a, b) => new Date(a.date) - new Date(b.date));


const handleDeleteClick = (id) => {
  setDeleteItemId(id);
  setShowConfirmDeletion(true);
};

const handleConfirmDelete = () => {
  if (deleteItemId !== null) {
    const updatedItems = items.filter((item) => item.id !== deleteItemId);
    setItems(updatedItems);
    successAlert("Item deleted successfully", false);
    localStorage.setItem('MyItems', JSON.stringify(updatedItems));
  }
  setShowConfirmDeletion(false);
};



useEffect(() => {
  handleSearch(search);
}, [search, items]);





const profileRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfile(false);
    }
  };

  if (showProfile) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [showProfile]);



useEffect(() => {
  setNewUser(prevUser => ({ ...prevUser, profilePic: selectedAvatar }));
}, [selectedAvatar]);





useEffect(() => {
  // Apply the theme to the `data-theme` attribute on `html`
  document.documentElement.setAttribute("data-theme", darkMode ? 'dark' : 'light');
  // Save the theme in localStorage
  localStorage.setItem("isDarkMode", darkMode);



  if(darkMode){
    // alert('Dark Mode is on');
    localStorage.setItem('isDarkMode', true)
  } else {    
    localStorage.setItem('isDarkMode', false)
  }
}, [darkMode])









function functionAcceptCookies() {
  localStorage.setItem('acceptCookies', true);
  setAcceptCookies(true)
};
function functionRejectCookies() {
  localStorage.setItem('acceptCookies', false);
  setAcceptCookies(true);
};


const userCookies = localStorage.getItem('acceptCookies')

const [acceptCookies, setAcceptCookies] = useState(false);
useEffect(() => {
  if(userCookies === null){
    setAcceptCookies(false);
  } else{
    setAcceptCookies(true);
  }
}, [userCookies])


  return (
    <div className="Home">
      <audio ref={audioRef} src={audioSrc} />
      <Alert className='container shadow-lg' style={{maxWidth: '500px', position: 'fixed', zIndex:7856756786578567685768, transition: '.4s ease-in-out', left: '50%', transform: 'translatex(-50%)', top: success,}} severity="success"><strong>{'Success!'}</strong> {successMessage}</Alert>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            localStorage.setItem('User', JSON.stringify(newUser))
            handleClose();
          },
        }}
      >
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
          To start planning your todo in this website, please signup with your name here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Enter your Name"
            type="text"
            value={newUser.name}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <DialogContentText className='mt-4'>
            Choose profile
          </DialogContentText>
          <div className='d-flex gap-3 p-2'>
            { avatars.map((avatar, index)=> (<Avatar key={index} role='button' onClick={()=> setSelectedAvatar(avatar)} className={selectedAvatar === avatar && 'activeAvatar'} src={avatar} />))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Register</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showItemModal}
        onClose={handleCloseItem}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            handleSubmit(event);
            handleCloseItem();
          },
        }}
      >
        <DialogTitle>Create New Todo Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
          To create a  item in this website, please enter item details here.
          </DialogContentText>
          <DialogContentText className='mt-3 fw-bold'>
            Please enter item name here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Enter Name Name"
            type="text"
            value={newItem.name}
            onChange={handleItemNameChange}
            fullWidth
            variant="standard"
          />
          <DialogContentText className='mt-3 fw-bold'>
            Enter Time.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="time"
            type="time"
            value={newItem.time}
            onChange={handleTimeChange}
            fullWidth
            variant="standard"
          />
          <DialogContentText className='mt-3 fw-bold'>
            Enter Date.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            type="date"
            value={newItem.date}
            onChange={handleDateChange}
            fullWidth
            variant="standard"
          />


        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setShowItemModal(false)}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConfirmDeletion}
        onClose={()=> setShowConfirmDeletion(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Are you sure you want to delete this item? You will not be able to recover it once it is deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=> setShowConfirmDeletion(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} className='text-danger' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>





      <nav className='container p-0 mt-3 mb-2 px-3 d-flex justify-content-between align-items-center'>
        <img className='logo' src={darkMode ? './dark-logo.png' : './logo.png'} alt=''/>
        <div style={{position: 'relative'}}>
        <Avatar className='border' src={storedAvatar} onClick={()=> setShowProfile(true)}/>
          {
            showProfile && (
              <motion.div ref={profileRef} className='rounded-4 p-2 menuBox shadow-lg' style={{width: '330px', position: 'absolute', right: 0, top: 0}}
              variants={{
                hidden: { opacity: 0, x: 140, y: -120, scale: 0 }, // Start from top-right
                show: { 
                  opacity: 1, 
                  x: 0, 
                  y: 0, 
                  scale: 1, 
                  transition: { duration: 0.1 } 
                },
              }}
              initial={'hidden'} whileInView={"show"} viewport={{once: false, amount: 0.2}}
              >
                <div className='d-flex justify-content-end'> <ion-icon role='button' name="close-outline" onClick={()=> setShowProfile(false)} style={{color: 'red', cursor: 'pointer'}}></ion-icon></div>
                <div className='d-flex justify-content-center mb-2'>
                <Avatar sx={{ width: 56, height: 56 }} className='border' src={storedAvatar} onClick={()=> setShowProfile(true)}/>
                </div>
                <div className='p-2 fw-bold text-center greetingMenu' style={{}}>Hi {userName ? userName : 'User'},</div> 
                <div className='p-2 mb-2 rounded-2 d-flex gap-4' role={'button'} onClick={()=> {
                  // window.location.reload();
                }}>
                  <NoteAltOutlined /> Notepad/diary
                </div>
                <div className='p-2 mb-2 rounded-2 d-flex gap-4' role={'button'} onClick={()=> {
                  // window.location.reload();
                }}>
                  <PhoneAndroidIcon /> Download App
                </div>
                {
                  userName !== '' ? (
                <div className='p-2 text-danger rounded-2 d-flex gap-4' role={'button'} onClick={()=> {
                  localStorage.removeItem('User');
                  window.location.reload();
                }}>
                  <LogoutIcon /> Logout
                </div>
                  ) : (
                    <div className='p-2 rounded-2 d-flex gap-4' role={'button'} onClick={()=> {
                      setOpen(true);
                      setShowProfile(false);

                    }}>
                      <LoginIcon /> Login
                    </div>
                  )
                }                
                <FormControlLabel
                  control={<MaterialUISwitch sx={{ m: 1, scale: 0.8 }} checked={darkMode} onChange={(e)=> {
                    localStorage.setItem("isDarkMode", e.currentTarget.checked);
                    setDarkMode(e.currentTarget.checked)
                  }}/>}
                  label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                />
              </motion.div>
            )
          }
        </div>
      </nav>
      <div className='container heroBanner p-4 mt-3 d-flex flex-column text-light justify-content-end rounded-5 shadow' style={{background: 'url("./green-nature-tgy6dtxhgtwubez9.jpg")', backgroundColor: 'gray', backgroundPosition: 'center', objectFit: 'cover', height: '35vh', backgroundBlendMode: 'multiply', backgroundRepeat: 'no-repeat', backgroundPositionX: '50%', backgroundPositionY: '50%'}}>
        <h2 className='fw-bold'>{userName ? 'Welcome back '+userName.split(' ')[0] : 'Welcome to ToDo'},</h2>
        <div className='d-flex justify-content-between align-items-center'><small>Having a good {(new Date()).getHours() <= 12 ? 'morning' : (new Date()).getHours() >= 19 ? 'night' : "afternoon"}?</small> <small>{currentTime}</small></div>
      </div>
      {
        userName !== '' && sortedItems.length > 0 ? (
      <div className='container upcomingBanner p-4 mt-3 d-flex flex-column text-light justify-content-end rounded-5 shadow' style={{background: `url(${storedAvatar})`, backgroundColor: 'rgba(0, 0, 0, 0.6)', backgroundPosition: 'center', objectFit: 'cover', height: '20vh', backgroundBlendMode: 'multiply', backgroundRepeat: 'no-repeat', backgroundPositionX: '50%', backgroundPositionY: '50%'}}>
        <div className='d-flex justify-content-between align-items-center upcomindTitle'><h5>Upcoming Item</h5></div>
        <h2 className='fw-bold'>{sortedItems[0]?.name},</h2>
        <div className='d-flex justify-content-between align-items-center'><small>Time: {sortedItems[0]?.time}, {sortedItems[0]?.date}</small> <div className='d-flex align-items-center'> <ion-icon role="button" name="trash-outline" onClick={()=> handleDeleteClick(sortedItems[0]?.id)} style={{ color: 'red', cursor: 'pointer' }}></ion-icon></div></div>
      </div>
        ) : (
          <div className='container upcomingBanner p-4 mt-3 d-flex flex-column text-light justify-content-center rounded-5 shadow' style={{background: `url(${storedAvatar})`, backgroundColor: 'rgba(0, 0, 0, 0.6)', backgroundPosition: 'center', objectFit: 'cover', height: '20vh', backgroundBlendMode: 'multiply', backgroundRepeat: 'no-repeat', backgroundPositionX: '50%', backgroundPositionY: '50%'}}>
            <h5 className='fw-bold text-center'>No Upcoming Items</h5>
          </div>
        )
      }
      <div className='container p-3 mt-3'>
        <div className='d-flex justify-content-between align-items-center'> <div className='d-flex justify-content-between align-items-center gap-3'><Avatar className='' src={storedAvatar}/> {userName !== '' &&  sortedItems.length > 0 && <small>Upcoming: <strong className='upcomindTitle'>{sortedItems[0]?.name}</strong> @{sortedItems[0]?.time}, {sortedItems[0]?.date}</small>}</div> <ion-icon onClick={handleClickAdd} role='button' name="add-circle-outline" style={{cursor: 'pointer'}}></ion-icon></div>
        <div className='mt-3 mb-3'>
          <input className='p-3 rounded-3 w-100 border-0 itemBg' style={{color: darkMode ? 'white' : 'black'}} type='search' value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder='Search item...' />
        </div>
        <div className='mt-5 mb-4 d-flex flex-column gap-4' style={{minHeight: 'none'}}>
          {
            userName === '' ? (
          <div className='border itemBg p-2 gap-2 d-flex flex-column justify-content-center align-items-center' style={{height: '30vh'}}>
            <ion-icon role='button' name="alert-circle-outline" style={{color: 'red'}}></ion-icon>
            You do not have any item in you To-do
            <p><small>Login & Create a new item to get started.</small></p>
          </div>
            ) : (
              filteredItems.map((item, index)=> (             
              <div
                key={index}
                className={`item rounded p-3 py-4 d-flex gap-3 itemBg ${item.complete ? 'completed' : ''}`}
                style={{ backgroundColor: item.complete ? (darkMode ? 'transparent' : 'white') : darkMode ? '#11212D' : 'whitesmoke', border: item.complete ? (darkMode ? '1px solid rgba(128, 128, 128, 0.835)' : '1px solid gainsboro') : darkMode ? '' : '1px solid gray'}}
                >
                <input
                  style={{ height: '20px', width: '20px' }}
                  type="checkbox"
                  checked={item.complete}
                  onChange={() => {
                    toggleComplete(item.id);
                    successAlert('"' + item.name + '"'+ ' completed successfully!', item.complete)
                  }}
                />
                <div className="ml-3" style={{ flex: 1 }}>
                  <h5 className={item.complete ? 'strikethrough' : ''}>{item.name}</h5>
                  <small  className={item.complete ? 'strikethrough' : ''}>{item.time} | {checkDate(item.date)}</small>
                </div>
                <ion-icon role="button" name="pencil-outline" style={{ color: 'blue' }}></ion-icon>
                <ion-icon role="button" name="trash-outline" onClick={()=> handleDeleteClick(item.id)} style={{ color: 'red' }}></ion-icon>
              </div>
              ))
            )
          }
          {/* <div className='item border p-2 px-3 d-flex gap-3' style={{backgroundColor: 'whitesmoke'}}>
            <input style={{height: '60px'}} type='checkbox' checked={true} />
            <div className='ml-3' style={{flex: 1}}>
              <h5>Go to the gym!</h5>
              <small>18:00 Today</small>
            </div>
            <ion-icon role='button' name="pencil-outline" style={{color: 'blue'}}></ion-icon>
            <ion-icon role='button' name="trash-outline" style={{color: 'red'}}></ion-icon>
          </div> */}
        </div>

        <div className='text-center mt-4'>Completed <strong>{completedItems}</strong> of <strong>{items.length}</strong></div>
      </div>
      {/* <motion.div className='bg-black container rounded-3 text-light text-center p-4 dark mb-3 d-flex fs-4 justify-content-center align-items-center' style={{height: '50vh'}} variants={fadeIn("right", 0.2)} initial={'hidden'} whileInView={"show"} viewport={{once: false, amount: 0.2}} number={1}> Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 Box 1 </motion.div> */}
      { !acceptCookies &&(
        <div className='cookies'>
          <p>By using this website, you agree to our use of cookies. We use cookies to provide you with a great experience and to help our website run effectively.</p>
          <div>
            <button className='accept' onClick={functionAcceptCookies}>Accept</button>
            <button className='reject' onClick={functionRejectCookies}>Reject All</button>
          </div>
        </div>
      )}
        <footer className='text-center d-flex flex-column gap-2'>
          <div className="toTop" title='Scroll to Top' onClick={()=> window.scrollTo(0, 0)}>
            <svg width="37" height="39" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.29289 8.70711C9.68342 9.09763 10.3166 9.09763 10.7071 8.70711L17.0711 2.34315C17.4616 1.95263 17.4616 1.31946 17.0711 0.928937C16.6805 0.538413 16.0474 0.538412 15.6569 0.928936L10 6.58579L4.34315 0.928928C3.95263 0.538404 3.31946 0.538403 2.92894 0.928927C2.53841 1.31945 2.53841 1.95262 2.92894 2.34314L9.29289 8.70711ZM9 7L9 8L11 8L11 7L9 7Z" fill="white"/>
            <path d="M9.29289 20.7071C9.68342 21.0976 10.3166 21.0976 10.7071 20.7071L17.0711 14.3432C17.4616 13.9526 17.4616 13.3195 17.0711 12.9289C16.6805 12.5384 16.0474 12.5384 15.6569 12.9289L10 18.5858L4.34315 12.9289C3.95263 12.5384 3.31946 12.5384 2.92894 12.9289C2.53841 13.3195 2.53841 13.9526 2.92894 14.3431L9.29289 20.7071ZM9 19L9 20L11 20L11 19L9 19Z" fill="white"/>
            <path d="M9.29289 14.7071C9.68342 15.0976 10.3166 15.0976 10.7071 14.7071L17.0711 8.34315C17.4616 7.95263 17.4616 7.31946 17.0711 6.92894C16.6805 6.53841 16.0474 6.53841 15.6569 6.92894L10 12.5858L4.34315 6.92893C3.95263 6.5384 3.31946 6.5384 2.92894 6.92893C2.53841 7.31945 2.53841 7.95262 2.92894 8.34314L9.29289 14.7071ZM9 13L9 14L11 14L11 13L9 13Z" fill="white"/>
            </svg>
          </div>
          <div className='d-flex flex-row justify-content-center gap-3'>
                <a href='https://www.instagram.com/oduk_sr/'><i className="fa-brands fa-instagram"></i></a>
                <a href='https://www.facebook.com/profile.php?id=100069487444055'><i className="fa-brands fa-facebook-f"></i></a>
                <a href='https://www.youtube.com/channel/UCPrYwmoy9wVGNwg-dmyCNRQ'><i className="fa-brands fa-youtube"></i></a>
                <a href='https://open.spotify.com/user/31uk62sl7qzzfdry74zbulgvumri'><i className="fa-brands fa-spotify"></i></a>
                <a href='https://www.blogger.com/blog/posts/205945650435362831?bpli=1&pli=1'><i className="fa-solid fa-blog"></i></a>
          </div>
          <p>Copyright ©2025 All Rights Reserved | Designed & Developed by Austine Oduk <a className='link' href='https://github.com/DevOduk'>See Github Profile</a> | <a className='link' href='https://austine-oduk.vercel.app'>See Portfolio</a></p>
        </footer>
    </div>
  );
}

export default App;
