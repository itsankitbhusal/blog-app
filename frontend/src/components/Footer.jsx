import React from "react";
import { FaLocationArrow, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className=" mx-[10vw] py-[4vh] grid gap-4 ">
        <div className=" flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tech Blog</h1>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quod.
            </p>
          </div>
          <div className=" text-right justify-end">
            <div className="flex gap-2 items-center">
              <FaLocationArrow />
              <p>08 Kawasoti, Nawalpur, Nepal</p>
            </div>
            <div className="flex gap-2 items-center justify-end">
              <FaPhoneAlt />
              <p>+1 234 567 937</p>
            </div>
          </div>
        </div>
        <div className="foot flex gap-4 justify-between ">
          {/* add divider using tailwind css*/}
          <div className="foot__links">
            <h3 className=" font-bold">Quick Links</h3>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="foot__links">
            <h3 className="font-bold">Services</h3>
            <ul>
              <li>Web Design</li>
              <li>Web Development</li>
              <li>Mobile App</li>
              <li>UI/UX Design</li>
              <li>Graphic Design</li>
            </ul>
          </div>
          <div className="foot__links">
            <h3 className=" font-bold">Follow Us</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom flex justify-between">
          <div className="footer__bottom__left flex gap-4  ">
            <p className="border-b-2 border-brand-primary">Terms of Service</p>
            <p className="border-b-2 border-brand-primary">Privacy Policy</p>
          </div>
          <div className="footer__bottom__right">
            <p>
              Copyright © {new Date().getFullYear() + " "}
              <span className=" font-bold">Tech Blog</span>. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
