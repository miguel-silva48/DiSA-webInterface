const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 fixed bottom-0 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
        <div className="md:w-1/3">
          <h3 className="text-xl font-bold mb-4">DiSA</h3>
          <p>Digitally Signed Archive is a platform that allows you to save and sign files with authenticity and integrity guarantee.</p>
        </div>
        <div className="md:w-1/3 mt-6 md:mt-0">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p>Aveiro University, Portugal</p>
          <p>Email: example@example.com</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} DiSA. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
