import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getProfileUsers } from '../../redux/actions/profileAction'
import LoadIcon from '../../images/loading.gif'
import MyPosts from './MyPosts'
import SavedPosts from './SavedPosts'

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
                // profile.loading ? (
                //     <img className='d-block mx-auto' src={LoadIcon} alt='loading' />
                // ) :
                <MyPosts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                // (
                //     <>
                //         {
                //             saveTab ? (
                //                 <SavedPosts auth={auth} dispatch={dispatch} />
                //             ) : (
                //                 <MyPosts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                //             )
                //         }
                //     </>
                // )
            }
            {
                tabIndex === 1 ?
                    'My Posts' :
                    tabIndex === 2 ?
                        'Followers' :
                        tabIndex === 3 ? 
                            'Following' :
                            'Bookmarks'
            }
        </div>
    )
}

export default ProfileBodyRight
