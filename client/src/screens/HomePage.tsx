import { fetchUserTasks } from '../actions/taskActions'
import Card from '../components/Card'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { setStateNull, setUserTasks } from '../store/Features/taskSlice'
import { setLogout } from '../store/Features/userSlice'
import { useAppDispatch, useAppSelector } from '../store/store'
import { useEffect } from 'react'

const HomePage = () => {

  const token = useAppSelector(state => state.person.userInfo.token)
  const tasks = useAppSelector(state => state.task.userTasks)
  const loading = useAppSelector(state => state.task.loading)

  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchUserTasks(token).then(tasks => {
      dispatch(setUserTasks(tasks))
    })
  }, [])

  const logout = () => {
    localStorage.clear();
    dispatch(setLogout())
    dispatch(setStateNull())
  }

  return (
    <div className='bg-gray-300 min-h-screen'>
      <header>
        <Navbar onLogout={logout} />
      </header>
      <main>
        {loading ? (
          <div className='flex min-h-screen w-full justify-center bg-black items-center'>
            <Loading />
          </div>
        ) : (
          tasks?.map(data => (
            <Card data={data} />
          ))
        )
        }
      </main>
    </div>
  )
}

export default HomePage