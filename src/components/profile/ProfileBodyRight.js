import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getProfileUsers } from '../../redux/actions/profileAction'
import Followers from './Followers'
import Followees from './Following'
import MyPosts from './MyPosts'
import Bookmarks from './Bookmarks'

const tabItems = [
    {
        key: 1,
        label: 'My Posts',
    },
    {
        key: 2,
        label: 'Followers',
    },
    {
        key: 3,
        label: 'Following',
    },
    {
        key: 4,
        label: 'Bookmarks',
    }
]

const TabItems = ({ tabIndex, id }) => {

    switch (tabIndex) {
        case 1:
            return <MyPosts id={id} />
        case 2:
            return <Followers />
        case 3:
            return <Followees />
        case 4:
            return <Bookmarks id={id} />
        default:
            return <>Not found</>
    }
}

const ProfileBodyRight = () => {
    const { profile, auth } = useSelector((state) => state)
    const dispatch = useDispatch()

    const { id } = useParams()
    const [tabIndex, setTabIndex] = useState(1)
    const [user, setUser] = useState()

    useEffect(() => {
        if (profile.ids.every((item) => item !== id)) {
            dispatch(getProfileUsers({ id, auth }))
        }
    }, [id, auth, dispatch, profile.ids])

    useEffect(() => {
        setUser(profile.users.filter((user) => user.userId === id)[0])
    }, [profile.users, id])

    if (!user) {
        return <></>
    }

    return (
        <div>
            <div style={{backgroundColor: 'white'}}>
                {
                    auth.user.userId === id && (
                        <div className='profile_tab'>
                            {
                                tabItems.map((item, index) => (
                                    <button
                                        key={item.key}
                                        className={tabIndex === item.key? 'active' : ''}
                                        onClick={() => setTabIndex(item.key)}
                                    >
                                        {item.label}
                                    </button>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            {
                <TabItems
                    tabIndex={tabIndex}
                    id={id}
                />
            }
        </div>
    )
}

export default ProfileBodyRight
