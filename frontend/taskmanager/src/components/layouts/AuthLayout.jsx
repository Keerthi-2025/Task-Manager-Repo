import LogImage from '../../assets/images/new.jpg';

function AuthLayout({ children }) {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Task Manager</h2>
        {children}
      </div>

      <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-amber-300 bg-cover bg-no-repeat bg-center overflow-hidden p-8">
        <img className="w-64 lg:w-[90%]" src={LogImage} alt="Auth visual" />
      </div>
    </div>
  );
}

export default AuthLayout;
