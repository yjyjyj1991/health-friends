/*eslint-disable*/
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const RoomCreate = (props) => {

    let [file, setFile] = useState(null);
    let [fileName, setFileName] = useState('');
    let [roomTitle, setRoomTitle] = useState('');
    let [roomType, setRoomType] = useState('');
    let [roomDesc, setRoomDesc] = useState('');
    let history = useHistory();

    return (
        <>
            <Dialog open={props.open}>
                <DialogTitle>방 생성하기</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <form onSubmit={()=>(handlerFormSubmit)}>
                            <input type='file' name='file' file={file} value={fileName} onChange={()=>(handleFileChange)} placeholder='방 이름'></input> <br/>
                            <input type='text' name='roomTitle' value={roomTitle} onChange={()=>(handleValueChange)} placeholder='방 이름'></input> <br/>
                            <input type='text' name='roomType' value={roomType} onChange={()=>(handleValueChange)} placeholder='운동 종류'></input> <br/>
                            <input type='text' name='roomDesc' value={roomDesc} onChange={()=>(handleValueChange)} placeholder='방 상세 설명'></input> <br/>
                        </form> 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' type='submit'>생성</Button>
                    <Button variant='outlined' onClick={ ()=>{ history.go('/rooms') } }>취소</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RoomCreate;