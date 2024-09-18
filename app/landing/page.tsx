"use client";
import React from "react";
import Link from "next/link";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { FeaturesSectionDemo } from "../components/ui/Image";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div>
      <nav className="border-b border-theme-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white flex-row justify-center items-center gap-2 flex">
            <Image
              src="/favicon.ico"
              alt="socially Blind"
              width="40"
              height="40"
            />
            <p> Socially Blind</p>
          </div>
          <div>
            <Link
              href="https://github.com/harsh-deepsingh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="40"
                viewBox="0 0 30 30"
                fill="white"
              >
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-theme-black text-white h-screen py-10 sm:py-20">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
            <h1 className="md:text-6xl font-bold mb-2 sm:mb-4 text-2xl">
              Connect Anonymously. Share Freely.
            </h1>
            <p className="md:text-2xl mb-4 sm:mb-8 text-sm">
              Join communities based on your email domain and share thoughts
              anonymously.
            </p>
            <div className="w-28">
              <Link href="/signin">
                <PrimaryButton>Join now</PrimaryButton>
              </Link>
            </div>
          </div>
          <div className="flex-1 bg-black flex items-center justify-center mt-8 sm:mt-0">
            <FeaturesSectionDemo></FeaturesSectionDemo>
          </div>
        </div>
      </section>

      <section className="py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 sm:mb-8">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-theme-grey p-4 sm:p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-bold mb-2 sm:mb-4">
                Anonymous Interactions
              </h3>
              <p>
                Stay completely anonymous while connecting with your community.
              </p>
            </div>
            <div className="bg-theme-grey p-4 sm:p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-bold mb-2 sm:mb-4">
                Domain-Based Communities
              </h3>
              <p>
                Join a unique community of users sharing the same email domain.
              </p>
            </div>
            <div className="bg-theme-grey p-4 sm:p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-bold mb-2 sm:mb-4">
                Cross-Community Posts
              </h3>
              <p>
                Share your ideas across different communities and connect beyond
                borders.
              </p>
            </div>
            <div className="bg-theme-grey p-4 sm:p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-bold mb-2 sm:mb-4">Shared Posts</h3>
              <p>
                See what&apos;s trending in other communities by browsing shared
                posts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 sm:py-36 bg-black ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 sm:mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2 sm:mb-4">Sign Up</h3>
              <p>Create an account using your email domain.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2 sm:mb-4">
                Join a Community
              </h3>
              <p>
                You&apos;ll be placed in a community of users sharing your email
                domain.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2 sm:mb-4">
                Post & Share
              </h3>
              <p>
                Post within your community or share thoughts in other
                communities.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2 sm:mb-4">
                Stay Anonymous
              </h3>
              <p>Your personal information is never shared.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p>&copy; 2024 Socially Blind. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link
              href="https://www.linkedin.com/in/harshdeepsingh9828"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>Contact Us</p>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
