"use client";
import React from "react";
import Link from "next/link";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { FeaturesSectionDemo } from "../components/ui/Image";

const LandingPage = () => {
  return (
    <div>
      <nav className="border-b border-theme-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">Socially Blind</div>
          <div>
            <Link href="/signin">
              <PrimaryButton>Sign Up</PrimaryButton>
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-theme-black text-white h-screen py-32">
        <div className="flex">
          <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
            <h1 className="md:text-6xl font-bold mb-4 text-2xl">
              Connect Anonymously. Share Freely.
            </h1>
            <p className="md:text-2xl mb-8 text-lg">
              Join communities based on your email domain and share thoughts
              anonymously.
            </p>
            <div className="w-28">
              <Link href="/signup">
                <PrimaryButton>Join now</PrimaryButton>
              </Link>
            </div>
          </div>
          <div className="flex-1 bg-black flex items-center justify-center">
            <FeaturesSectionDemo></FeaturesSectionDemo>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-theme-grey p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-bold mb-4">
                Anonymous Interactions
              </h3>
              <p>
                Stay completely anonymous while connecting with your community.
              </p>
            </div>
            <div className="bg-theme-grey p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-bold mb-4">
                Domain-Based Communities
              </h3>
              <p>
                Join a unique community of users sharing the same email domain.
              </p>
            </div>
            <div className="bg-theme-grey p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-bold mb-4">Cross-Community Posts</h3>
              <p>
                Share your ideas across different communities and connect beyond
                borders.
              </p>
            </div>
            <div className="bg-theme-grey p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-bold mb-4">Shared Posts</h3>
              <p>
                See what&apos;s trending in other communities by browsing shared
                posts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Sign Up</h3>
              <p>Create an account using your email domain.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Join a Community</h3>
              <p>
                You&apos;ll be placed in a community of users sharing your email
                domain.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Post & Share</h3>
              <p>
                Post within your community or share thoughts in other
                communities.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Stay Anonymous</h3>
              <p>Your personal information is never shared.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p>&copy; 2024 Anonymous Social Network. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link href="/about">
              <p>About</p>
            </Link>
            <Link href="/terms">
              <p>Terms of Service</p>
            </Link>
            <Link href="/privacy">
              <p>Privacy Policy</p>
            </Link>
            <Link href="/contact">
              <p>Contact Us</p>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
