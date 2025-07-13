"use client";

import Image from "next/image";
import React, { useState } from "react";
import CommunityTab from "@/components/CommunityTab";
import CollectionsPage from "@/components/CollectionsPage";
import Canvas from "@/components/Canvas";
import ChatPage from "@/components/Chat/ChatPage";
import {FolderPlusIcon,BookmarkSquareIcon, EnvelopeIcon,ArrowLeftOnRectangleIcon, PresentationChartBarIcon,GlobeAltIcon, ChevronDownIcon,  HomeIcon, ChatBubbleLeftIcon, UserGroupIcon,  LinkIcon, DocumentTextIcon, FolderIcon, CalendarIcon, PhotoIcon, CogIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import NewProject from "@/components/NewProject";
import ProjectDocuments from "@/components/ProjectDocuments";
import CalendarPage from "@/components/Calendar/CalendarPage";
import LoginForm from "@/components/LoginForm";
import SignupPage from "@/components/SignUpPage";



const navItems = [
  { label: "Home", icon: <HomeIcon className="h-6 w-6" /> },
  {
    label: "Chat",
    icon: <EnvelopeIcon className="h-6 w-6" />,
    hasDropdown: true,
    subItems: [
      { label: "Team", icon: <UserGroupIcon className="h-6 w-6" /> },
      { label: "ChitChat", icon: <ChatBubbleLeftIcon className="h-6 w-6" /> },
    ],
  },
  {
    label: "Community",
    icon: <GlobeAltIcon className="h-6 w-6" />,
    hasDropdown: true,
    subItems: [
      { label: "Learnings", icon: <BookmarkSquareIcon className="h-6 w-6" /> },
      { label: "Referings", icon: <LinkIcon className="h-6 w-6" /> },
      { label: "Posts", icon: <DocumentTextIcon className="h-6 w-6" /> },
    ],
  },
  { label: "Projects/Team", icon: <UserGroupIcon className="h-6 w-6" /> },
  { label: "Calendar", icon: <CalendarIcon className="h-6 w-6" /> },
  { label: "Collection", icon: <PhotoIcon className="h-6 w-6" /> },
  { label: "Canvas", icon: <PresentationChartBarIcon className="h-6 w-6" /> },
];

const tasks = [
  { title: "Design Review", description: "Finalize UI mockups" },
  { title: "API Integration", description: "Connect to backend endpoints" },
  { title: "Write Tests", description: "Achieve 80% coverage" },
  { title: "Deploy Staging", description: "Publish latest build" },
];

const meetings = [
  { time: "9:00 AM", desc: "Stand-up Meeting" },
  { time: "11:00 AM", desc: "Client Sync" },
  { time: "2:00 PM", desc: "UX Workshop" },
  { time: "4:30 PM", desc: "Team Retrospective" },
];

const projects = [
  {
    name: "Temp Mail UI/UX Project",
    desc: "Redesign dashboard and user flow",
    date: "21 May, 2025 – 2:00 PM",
    avatars: [
      "/images/avatar1.png",
      "/images/avatar2.png",
      "/images/avatar3.png",
    ],
  },
  {
    name: "Blockchain Prototype",
    desc: "Implement P2P network layering",
    date: "22 May, 2025 – 11:00 AM",
    avatars: [
      "/images/avatar2.png",
      "/images/avatar3.png",
      "/images/avatar4.png",
    ],
  },
  {
    name: "Video Streaming MVP",
    desc: "Build IPFS integration module",
    date: "23 May, 2025 – 1:30 PM",
    avatars: [
      "/images/avatar3.png",
      "/images/avatar4.png",
      "/images/avatar5.png",
    ],
  },
  {
    name: "Forensic Imager Firmware",
    desc: "Optimize hardware-level routines",
    date: "24 May, 2025 – 10:00 AM",
    avatars: [
      "/images/avatar4.png",
      "/images/avatar5.png",
      "/images/avatar1.png",
    ],
  },
];

const legendItems = [
  { label: "Temp Mail UI/UX", color: "bg-indigo-500", percent: "25%" },
  { label: "Blockchain Prototype", color: "bg-green-500", percent: "30%" },
  { label: "Video Streaming MVP", color: "bg-yellow-500", percent: "20%" },
  { label: "Forensic Imager", color: "bg-red-500", percent: "25%" },
];

const reminders = [
  { title: "Daily Stand-up", time: "9:00 AM" },
  { title: "Design Review", time: "1:00 PM" },
  { title: "Deploy to Prod", time: "5:00 PM" },
  { title: "Send Status Report", time: "6:30 PM" },
];

export default function DashboardPage() {
  const [showSignupPage, setShowSignupPage] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [activeNav, setActiveNav] = useState<string>("Home");
  const [activeTab, setActiveTab] = useState<"Today" | "Week" | "Month">(
    "Today"
  );
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(false);
  const [chatSubPage, setChatSubPage] = useState<"ChitChat" | "Team" | null>(
    null
  );
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const [communitySubPage, setCommunitySubPage] = useState<
    "Learnings" | "Referings" | "Posts" | null
  >(null);
  const [projectSubPage, setProjectSubPage] = useState<
    "NewProject" | "ProjectDoc" | null
  >(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const closeAllDropdowns = () => {
    setProjectDropdownOpen(false);
    setChatDropdownOpen(false);
    setCommunityDropdownOpen(false);
  };

  const handleNavClick = (label: string) => {
    setActiveNav(label);
    if (label !== "Projects/Team") {
      setProjectDropdownOpen(false);
      setProjectSubPage(null);
    }
    if (label !== "Chat") {
      setChatDropdownOpen(false);
      setChatSubPage(null);
    }
    if (label !== "Community") {
      setCommunityDropdownOpen(false);
      setCommunitySubPage(null);
    }
    // Set default subpage for Community when clicked
    if (label === "Community" && !communitySubPage) {
      setCommunitySubPage("Learnings");
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <aside
        className="hidden md:flex w-80 flex-col shrink-0"
        style={{ backgroundColor: "#dcdcdc" }}
      >
        <div className="px-6 py-8 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-semibold text-black">Logo</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  isDarkMode ? "" : ""
                }`}
              >
                {isDarkMode ? <SunIcon className="" /> : <MoonIcon className="" />}
              </button>
            </div>  
          </div>
          <nav className="flex-1 space-y-4">
            {navItems.map((item) => {
              if (item.label === "Projects/Team") {
                return (
                  <div key={item.label} className="space-y-2">
                    <button
                      onClick={() => {
                        handleNavClick(item.label);
                        closeAllDropdowns();
                        setProjectDropdownOpen((prev) => !prev);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-md ${
                        activeNav === item.label
                          ? "bg-white text-black"
                          : "text-black hover:bg-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${
                          projectDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {projectDropdownOpen && (
                      <div className="ml-10 space-y-2 text-sm">
                        <button
                          className="flex items-center gap-2 text-black hover:text-indigo-600"
                          onClick={() => {
                            setActiveNav("Projects/Team");
                            setProjectSubPage("NewProject");
                          }}
                        >
                          <FolderPlusIcon className="w-4 h-4" /> New Project
                        </button>
                        <div className="text-gray-600 text-xs uppercase mt-1">
                          Recent
                        </div>
                        <ul className="space-y-1">
                        <li className="flex items-center gap-2 text-black hover:text-indigo-600 cursor-pointer">
                            <DocumentTextIcon className="h-6 w-6" />
                            <span>UI Designs</span>
                          </li>
                          <li
                            className="flex items-center gap-2 text-black hover:text-indigo-600 cursor-pointer"
                            onClick={() => {
                              setActiveNav("Projects/Team");
                              setProjectSubPage("ProjectDoc");
                            }}
                          >
                            <DocumentTextIcon className="h-6 w-6" />
                            <span>Project Doc.</span>
                          </li>
                          
                          <li className="flex items-center gap-2 text-black hover:text-indigo-600 cursor-pointer">
                            <FolderIcon className="h-6 w-6" />
                            <span>Web Application</span>
                          </li>
                          <li className="flex items-center gap-2 text-black hover:text-indigo-600 cursor-pointer">
                            <DocumentTextIcon className="h-6 w-6" />
                            <span>Wireframes</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                );
              } else if (item.label === "Chat" && item.hasDropdown) {
                return (
                  <div key={item.label} className="space-y-2">
                    <button
                      onClick={() => {
                        handleNavClick(item.label);
                        closeAllDropdowns();
                        setChatDropdownOpen((prev) => !prev);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-md ${
                        activeNav === item.label
                          ? "bg-white text-black"
                          : "text-black hover:bg-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${
                          chatDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {chatDropdownOpen && (
                      <div className="ml-10 space-y-2 text-sm">
                        {item.subItems?.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() => {
                              setActiveNav("Chat");
                              setChatSubPage(sub.label as "ChitChat" | "Team");
                            }}
                            className="flex items-center gap-2 text-black hover:text-indigo-600"
                          >
                            {sub.icon}
                            <span>{sub.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else if (item.label === "Community" && item.hasDropdown) {
                return (
                  <div key={item.label} className="space-y-2">
                    <button
                      onClick={() => {
                        handleNavClick(item.label);
                        closeAllDropdowns();
                        setCommunityDropdownOpen((prev) => !prev);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-md ${
                        activeNav === item.label
                          ? "bg-white text-black"
                          : "text-black hover:bg-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${
                          communityDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {communityDropdownOpen && (
                      <div className="ml-10 space-y-2 text-sm">
                        {item.subItems?.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() => {
                              setActiveNav("Community");
                              setCommunitySubPage(
                                sub.label as "Learnings" | "Referings" | "Posts"
                              );
                            }}
                            className="flex items-center gap-2 text-black hover:text-indigo-600"
                          >
                            {sub.icon}
                            <span>{sub.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label)}
                  className={`flex w-full items-center px-3 py-2 rounded-md ${
                    activeNav === item.label
                      ? "bg-white text-black"
                      : "text-black hover:bg-gray-300"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="mt-auto space-y-3">
            <button className="flex w-full items-center px-3 py-2 text-black hover:text-white hover:bg-gray-700 rounded-md">
              <CogIcon className="mr-2 h-6 w-6" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                setShowLoginPage(true);
                setActiveNav("Login");
              }}
              className="flex w-full items-center px-3 py-2 text-black hover:text-white hover:bg-gray-700 rounded-md"
            >
              <ArrowLeftOnRectangleIcon className="mr-2 h-6 w-6" />
              <span>Log In</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header only on Home */}
        {activeNav === "Home" && (
          <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 text-black">
            <h1 className="text-4xl font-bold" style={{ color: "#2d2d2d" }}>
              DASHBOARD
            </h1>
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-md border border-gray-400 bg-white px-4 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </header>
        )}

        <main className="flex-1 overflow-y-auto p-6 bg-white">
          {/* Home */}
          {activeNav === "Home" && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left */}
              <div className="space-y-8 lg:col-span-2">
                {/* Tasks & Meetings */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Today's Tasks */}
                  <section className="rounded-[24px] bg-[#F6F6F6] p-6 shadow-md border border-[#D9D9D9]">
                    <h2 className="mb-4 text-2xl font-semibold">
                      Today's Tasks
                    </h2>
                    <ul className="space-y-3">
                      {tasks.map((task, idx) => (
                        <li
                          key={idx}
                          className="flex items-start rounded-[24px] border border-[#D9D9D9] bg-white p-4 hover:bg-gray-100"
                        >
                          <div className="flex-1">
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="mt-1 text-sm text-gray-600">
                              {task.description}
                            </p>
                          </div>
                          <button className="ml-4 rounded-md bg-[#5865f2] px-3 py-1 text-sm font-medium text-white hover:bg-[#4752d6]">
                            Done
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Today's Meetings */}
                  <section className="rounded-[24px] bg-[#F6F6F6] p-6 shadow-md border border-[#D9D9D9]">
                    <h2 className="mb-4 text-2xl font-semibold">
                      Today's Meetings
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {meetings.map((meet, idx) => (
                        <div
                          key={idx}
                          className="rounded-[24px] border border-[#D9D9D9] bg-white p-4 hover:bg-gray-100"
                        >
                          <p className="font-semibold">{meet.time}</p>
                          <p className="mt-1 text-sm text-gray-600">
                            {meet.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Project Lists */}
                <section className="rounded-[24px] bg-[#F6F6F6] p-6 shadow-md border border-[#D9D9D9]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Project Lists</h2>
                    <div className="space-x-2">
                      {(["Today", "Week", "Month"] as const).map((label) => (
                        <button
                          key={label}
                          onClick={() => setActiveTab(label)}
                          className={`rounded-md px-4 py-2 text-sm font-medium ${
                            activeTab === label
                              ? "bg-[#5865f2] text-white"
                              : "bg-gray-200 text-black hover:bg-gray-300"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 space-y-5">
                    {projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-[24px] border border-[#D9D9D9] bg-white p-4 hover:bg-gray-100"
                      >
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold">{proj.name}</h3>
                          <p className="text-sm text-gray-600">{proj.desc}</p>
                          <p className="text-xs text-gray-500">{proj.date}</p>
                        </div>
                        <div className="flex -space-x-2">
                          {proj.avatars.map((src, aidx) => (
                            <div
                              key={aidx}
                              className="relative h-8 w-8 rounded-full border-2 border-white"
                            >
                              <Image
                                src={src}
                                alt="avatar"
                                fill
                                className="rounded-full object-cover"
                                sizes="32px"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right */}
              <div className="space-y-8">
                {/* Projects Worked */}
                <section className="rounded-[24px] bg-[#F6F6F6] p-6 shadow-md border border-[#D9D9D9]">
                  <h2 className="mb-4 text-2xl font-semibold">
                    Projects Worked
                  </h2>
                  <div className="flex items-center justify-center">
                    <div className="relative h-40 w-40">
                      <svg
                        viewBox="0 0 36 36"
                        className="absolute h-full w-full"
                      >
                        <path
                          className="text-gray-200"
                          d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="text-indigo-500"
                          strokeDasharray="100, 100"
                          strokeDashoffset="75"
                          d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                        75%
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {legendItems.map((legend, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className={`h-4 w-12 rounded ${legend.color}`} />
                        <div className="text-sm font-medium">
                          {legend.label}
                        </div>
                        <div className="ml-auto text-sm text-gray-600">
                          {legend.percent}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Reminders */}
                <section className="rounded-[24px] bg-[#F6F6F6] p-6 shadow-md border border-[#D9D9D9]">
                  <h2 className="mb-4 text-2xl font-semibold">Reminders</h2>
                  <ul className="space-y-3">
                    {reminders.map((reminder, idx) => (
                      <li
                        key={idx}
                        className="rounded-[24px] border border-[#D9D9D9] bg-white p-4 hover:bg-gray-100"
                      >
                        <div className="flex justify-between">
                          <div>{reminder.title}</div>
                          <div className="text-sm text-gray-600">
                            {reminder.time}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          )}

          {/* Chat */}
          {activeNav === "Chat" && (
            <div className="p-6 bg-white min-h-screen">
              {chatSubPage === "ChitChat" && <ChatPage tab="ChitChat" />}
              {chatSubPage === "Team" && <ChatPage tab="Team" />}
              {!chatSubPage && <ChatPage tab="Team" />}
            </div>
          )}

          {/* Community */}
          {activeNav === "Community" && (
            <div className="p-6 bg-white min-h-screen">
              {communitySubPage && (
                <CommunityTab activeTab={communitySubPage} />
              )}
              {!communitySubPage && <CommunityTab activeTab="Posts" />}
            </div>
          )}

          {/* Projects/Team */}
          {activeNav === "Projects/Team" && (
            <div className="p-6 bg-white min-h-screen">
              {projectSubPage === "NewProject" && <NewProject />}
              {projectSubPage === "ProjectDoc" && <ProjectDocuments />}
              {!projectSubPage && <ProjectDocuments />}
            </div>
          )}

          {/* Calendar */}
          {activeNav === "Calendar" && <CalendarPage />}

          {/* Collection */}
          {activeNav === "Collection" && <CollectionsPage />}

          {/* Canvas */}
          {activeNav === "Canvas" && <Canvas />}
          {/*Login*/}
          {activeNav === "Login" && showLoginPage && (
          <div className="p-6 bg-white min-h-screen">
            <LoginForm
              onSuccess={() => {
                setIsLoggedIn(true);
                setShowLoginPage(false);
                setActiveNav("Home"); // redirect to Home after login
              }}
                setShowSignupPage={setShowSignupPage}
                setShowLoginPage={setShowLoginPage}
                setActiveNav={setActiveNav}
            />
          </div>
        )}
        {/*Sign Up */}
        {activeNav === "Signup" && showSignupPage && (
          <div className="p-6 bg-white min-h-screen">
            <SignupPage
              onSuccess={() => {
                setShowSignupPage(false);
                setShowLoginPage(true);
                setActiveNav("Login");
              }}
            />
          </div>
        )}
        </main>
      </div>
    </div>
  );
}