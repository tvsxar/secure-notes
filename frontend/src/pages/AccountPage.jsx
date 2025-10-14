import { useState, useContext } from 'react';
import { useSearchParams, Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AccountPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const isLogin = mode === 'login';
  const {handlePostQuery, setUser} = useContext(AuthContext);

  // states
  const [loginForm, setLoginForm] = useState({
    usernameOrEmail: '',
    password: ''
  })
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  function setForm(e) {
    e.preventDefault()
    const { name, value } = e.target;

    if (mode === 'login') {
      setLoginForm(prev => ({...prev, [name] : value}))
    } else if (mode === 'register') {
      setRegisterForm(prev => ({...prev, [name] : value}))
    }
  }

  async function handleSubmit(type, userData) {
    try {
      const res = await handlePostQuery(type, userData);
      setUser(res)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h1>
        <p className="text-gray-500 text-center mb-6">
          {isLogin
            ? 'Sign in to access your notes'
            : 'Create a new account'}
        </p>

        <form className="space-y-4"
        onSubmit={isLogin 
        ? handleSubmit('login', loginForm) 
        : handleSubmit('register', registerForm)}>
          {!isLogin && (
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={registerForm.username}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                onChange={setForm}
              />
            </div>
          )}

          <div>
            <input
              type={isLogin ? 'text' : 'email'}
              name={isLogin ? 'usernameOrEmail' : "email"}
              placeholder={mode === 'login' ? 'Email or username' : "Email"}
              value={isLogin ? loginForm.usernameOrEmail : registerForm.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              onChange={setForm}
            />
          </div>

          <div>
            <input
              type="password"
              name='password'
              placeholder="Password"
              value={isLogin ? loginForm.password : registerForm.password}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              onChange={setForm}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-black/80 transition active:scale-[0.98] cursor-pointer">
            {!isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          {!isLogin ? 'Already have an account? ' : "Don't have an account? "}
          <Link to={!isLogin ? '/account?mode=login' : '/account?mode=register'}>
            <span className="text-black font-medium hover:underline cursor-pointer">
              {!isLogin ? 'Sign In' : 'Sign Up'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;