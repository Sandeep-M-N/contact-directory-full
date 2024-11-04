// import React from 'react';
// import { List, ListItem, ListItemText, Typography } from '@mui/material';

// const groups = ['Electrical', 'Finance', 'Marketing', 'Software'];

// const GroupList = ({ selectedGroup, onSelectGroup }) => {
//     return (
//         <div style={{ backgroundColor: '#424242', padding: '16px', borderRadius: '8px' }}>
//             <Typography variant="h6" style={{ color: '#ffffff', marginBottom: '16px' }}>
//                 Groups
//             </Typography>
//             <List>
//                 {groups.map((group) => (
//                     <ListItem button key={group} onClick={() => onSelectGroup(group)} selected={selectedGroup === group}>
//                         <ListItemText primary={<span style={{ color: '#ffffff' }}>{group}</span>} />
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     );
// };

// export default GroupList;





import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const groups = ['Electrical', 'Finance', 'Marketing', 'Software'];

const GroupList = ({ selectedGroup, onSelectGroup }) => {
    return (
        <div style={{ backgroundColor: '#424242', padding: '16px', borderRadius: '8px', width: '250px', height: '100vh' }}>
            <Typography variant="h6" style={{ color: '#ffffff', marginBottom: '16px' }}>
                Groups
            </Typography>
            <List>
                {groups.map((group) => (
                    <ListItem
                        button
                        key={group}
                        onClick={() => onSelectGroup(group)}
                        selected={selectedGroup === group}
                        sx={{
                            '&:hover': {
                                backgroundColor: '#616161',
                            },
                        }}
                    >
                        <ListItemText primary={<span style={{ color: '#ffffff' }}>{group}</span>} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default GroupList;



