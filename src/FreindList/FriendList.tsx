import React from 'react'
import MesageItem from './MesageItem'

function FriendList() {
  return (
    <div>
        <MesageItem 
            avatar='https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg'
            name='Nhat Khuong'
            message='Hello jjj'
            time={new Date()}
        />

<MesageItem 
            avatar='https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg'
            name='Nhat Khuong'
            message='Hello jjj'
            time={new Date()}
        />

<MesageItem 
            avatar='https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg'
            name='Nhat Khuong'
            message='Hello jjj'
            time={new Date()}
        />
        
    </div>
  )
}

export default FriendList