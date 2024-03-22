/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import NavbarAdmin from '../../components/NavbarAdmin'
import {useUsersContext} from '../../hooks/useUsersContext'
import {useAuthContext} from '../../hooks/useAuthContext'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import UsersTable from '../../components/UsersTable'
import { Pagination } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import { useLogout } from '../../hooks/useLogout'

const Users_admin = () => {
  
  const {users, dispatch} = useUsersContext()
  const {user} = useAuthContext()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 6

    /* /timer */
    const {logout} = useLogout()

    const [lastActiveTime, setLastActiveTime] = useState(new Date());
  
    useEffect(() => {
      const logoutTimer = setTimeout(() => {
        const currentTime = new Date();
        const diffInMilliseconds = currentTime - lastActiveTime;
        if (diffInMilliseconds >= 60000) {
          logout();
        }
      }, 60000);
  
      return () => clearTimeout(logoutTimer);
    }, [lastActiveTime]);
  
    const handleInteraction = () => {
      setLastActiveTime(new Date());
    };
    /* /timer */

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:4000/api/endpoint/users/admin', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({type: 'SET_USERS', payload: json})
      }
    }
    if (user) {
      fetchUsers()
    }
  }, [dispatch, user])

  // Check if users is null or undefined
  if (!users) {
    return (
      <div>
        <NavbarAdmin />
        <div className="users-admin">
          <Spinner animation="border" variant='danger' role="status" className='user-admin-spinner'>
          </Spinner>
        </div>
      </div>
    )
  }

const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    .filter((user) => {
      return search.toLowerCase() === '' ? user : user.username.toLowerCase().includes(search);
    })
    .slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div onClick={handleInteraction}>
      <NavbarAdmin />
      <div className="users-admin">
        <div className="users-admin-headers">
          <Form>
            <Form.Control
              className='custom-search'
              type="text"
              autoFocus
              style={{ textAlign: 'center' }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search username" />
          </Form>
        </div>
        <div className="user-admin-table">
          <Table className='custom-table' striped bordered hover size="sm">
            <thead>
              <tr>
                <th className='text-center'>No.</th>
                <th className='text-center'>Username</th>
                <th className='text-center'>Email</th>
                <th className='text-center'>Role</th>
                <th className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <UsersTable key={user._id} users={user} index={index + indexOfFirstUser + 1} />
              ))}
            </tbody>
          </Table>
        </div>
          <div className="user-admin-pagination">
            <Pagination>
              {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}>
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
      </div>
    </div>
  )
}

export default Users_admin
