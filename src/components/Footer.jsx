
import { Footer } from 'flowbite-react';
import { BsFacebook,  BsInstagram, BsTwitter } from 'react-icons/bs';
import LogoImage from "../Assets/images/logo.png"
import { Link } from 'react-router-dom';

export default function FooterWeb() {
  return (
    <Footer container className='rounded-none mb-0 bg-opacity-80'>
      <div className="w-full">
        <div className="hidden w-full justify-evenly md:justify-between sm:flex  md:flex md:grid-cols-1">
          <div className='text-4xl'>
            <Footer.Brand
              alt="logo"
              href="#"
              name="digiAlbum"
              src={LogoImage}
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Gallery" />
              <Footer.LinkGroup col>
                <Footer.Link >
                  <Link to='/media'>Media </Link>
                </Footer.Link>
                
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">
                  Facebook
                </Footer.Link>
                <Footer.Link href="#">
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Contact" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">
                  Contact Us
                </Footer.Link>

              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        {/* <div className=''><Footer.Divider className='hidden md:block'/></div> */}
        
        <div className="w-full sm:flex sm:items-center md:justify-between">
          <Footer.Copyright
            by="digiAlbum"
            href="#"
            year={2023}
          />
          <div className="mt-4 md:mt-7 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
            />

          </div>
        </div>
      </div>
    </Footer>
  )
}


