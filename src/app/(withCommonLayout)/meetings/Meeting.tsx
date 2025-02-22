'use client';
import { generateVideoToken } from '@/utils/generateVideoToken';
// import './App.css';
import ZoomVideo from '@zoom/videosdk';
import { message } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaPhoneSlash } from 'react-icons/fa';
let client: ReturnType<typeof ZoomVideo.createClient> | null = null;

const Meeting = () => {
      const sdkKey = 'hnZyzxPrkfUjMq6Je0u8iVAQ6mLAJ4RwP6eg';
      const sdkSecret = 'AelZJtVlk4k3WgZJaJAtqPtAhYDW3H39RM8j';
      const sessionName = 'test-session';
      const [isInitialized, setIsInitialized] = useState(false);
      const [isJoined, setIsJoined] = useState(false);
      const [isVideoOn, setIsVideoOn] = useState(false);
      const [isAudioOn, setIsAudioOn] = useState(false);
      const [duration, setDuration] = useState(0);
      const [isScreenShareOn, setIsScreenShareOn] = useState(false);
      const videoRef = useRef<HTMLVideoElement>(null);
      const timerRef = useRef<NodeJS.Timeout>();

      const role = 0;
      const userName = 'John Cena'; // Example name

      useEffect(() => {
            if (isJoined) {
                  timerRef.current = setInterval(() => {
                        setDuration((prev) => prev + 1);
                  }, 1000);
            } else {
                  if (timerRef.current) {
                        clearInterval(timerRef.current);
                        setDuration(0);
                  }
            }
            return () => {
                  if (timerRef.current) clearInterval(timerRef.current);
            };
      }, [isJoined]);

      useEffect(() => {
            // Initialize client when component mounts
            const init = async () => {
                  try {
                        client = ZoomVideo.createClient();

                        await client.init('en-US', 'Global', {
                              webEndpoint: 'zoom.us',
                              patchJsMedia: false,
                              enforceMultipleVideos: false,
                              stayAwake: false,
                        });

                        console.log('✅ Video SDK client initialized');
                        setIsInitialized(true);
                  } catch (error) {
                        console.error('❌ Error initializing client:', error);
                  }
            };

            init();

            // Cleanup when component unmounts
            return () => {
                  if (client) {
                        client.leave();
                        client = null;
                  }
            };
      }, []); // Run once when component mounts

      const formatTime = (seconds: number) => {
            const hrs = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      };

      const toggleVideo = async () => {
            try {
                  if (!client) return;
                  const stream = client.getMediaStream();

                  // ✅ Check for camera availability
                  const devices = await navigator.mediaDevices.enumerateDevices();
                  const hasCamera = devices.some((device) => device.kind === 'videoinput');

                  if (!hasCamera) {
                        // ❌ No camera found - Display error message
                        message.error('Camera not found. Please connect a camera and try again.');
                        return;
                  }

                  if (isVideoOn) {
                        await stream.stopVideo();
                  } else {
                        // Request camera permission again if needed
                        await navigator.mediaDevices.getUserMedia({ video: true });
                        await stream.startVideo();
                        const videoElement = videoRef.current;
                        if (videoElement) {
                              stream.renderVideo(videoElement, client.getCurrentUserInfo().userId, 640, 360, 0, 0, 2);
                        }
                  }
                  setIsVideoOn(!isVideoOn);
            } catch (error) {
                  console.error('❌ Error toggling video:', error);
                  message.error('An error occurred while toggling video.');
            }
      };

      const toggleAudio = async () => {
            try {
                  if (!client) return;
                  const stream = client.getMediaStream();

                  if (isAudioOn) {
                        await stream.stopAudio();
                  } else {
                        // Request audio permission again if needed
                        await navigator.mediaDevices.getUserMedia({ audio: true });
                        await stream.startAudio();
                  }
                  setIsAudioOn(!isAudioOn);
            } catch (error) {
                  console.error('❌ Error toggling audio:', error);
            }
      };

      const joinSession = async () => {
            try {
                  if (!client || !isInitialized) {
                        console.log('⚠️ Please initialize the client first');
                        return;
                  }

                  const token = generateVideoToken(sdkKey, sdkSecret, sessionName, role);
                  await client.join(sessionName, token, userName);
                  setIsJoined(true);

                  // Start media after successful join
                  await toggleVideo().catch(console.error);
                  await toggleAudio().catch(console.error);
            } catch (error) {
                  console.error('❌ Error joining session:', error);
            }
      };

      const leaveSession = async () => {
            try {
                  if (!client || !isInitialized) {
                        console.log('⚠️ Client is not initialized');
                        return;
                  }

                  if (isVideoOn) {
                        const stream = client.getMediaStream();
                        await stream.stopVideo();
                        setIsVideoOn(false);
                  }

                  if (isAudioOn) {
                        const stream = client.getMediaStream();
                        await stream.stopAudio();
                        setIsAudioOn(false);
                  }

                  await client.leave();
                  setIsJoined(false);
            } catch (error) {
                  console.error('❌ Error leaving session:', error);
            }
      };

      const handleToggleScreenShare = async () => {
            try {
                  if (!client || !isInitialized) {
                        console.log('⚠️ Client is not initialized');
                        return;
                  }

                  // ✅ Get the element safely
                  if (isScreenShareOn) {
                        const stream = client.getMediaStream();
                        await stream.stopShareScreen();
                        setIsScreenShareOn(false);
                  } else {
                        const screenShareElement = document.getElementById('screen-share-preview') as
                              | HTMLVideoElement
                              | HTMLCanvasElement
                              | null;
                        console.log(screenShareElement);

                        if (!screenShareElement) {
                              console.error('❌ Screen share preview element not found!');
                              return;
                        }

                        // ✅ Start screen sharing with the correct element
                        client.getMediaStream().startShareScreen(screenShareElement, {});

                        setIsScreenShareOn(true);
                  }
            } catch (error) {
                  console.error('❌ Error sharing screen:', error);
            }
      };

      return (
            <div className="container relative min-h-[70vh] bg-gray-100 my-20">
                  <div className="absolute inset-0 flex flex-col">
                        <div className="flex-1 bg-gray-900 relative">
                              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />

                              {/* Session Info Overlay */}
                              <div className="absolute top-4 left-4 flex items-center space-x-2 text-white">
                                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">{userName[0]}</div>
                                    <span>{userName}</span>
                                    {isJoined && <span className="ml-4">{formatTime(duration)}</span>}
                              </div>

                              {/* Your Video Preview */}
                              {isJoined && (
                                    <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
                                          <video className="w-full h-full object-cover" playsInline muted />
                                    </div>
                              )}

                              {/* Screen Share Preview */}

                              <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
                                    <video id="screen-share-preview" className="w-full h-full object-cover" />
                              </div>
                        </div>

                        {/* Controls Bar */}
                        <div className="h-20 bg-white shadow-lg flex items-center justify-center space-x-6">
                              {!isJoined ? (
                                    <button
                                          onClick={joinSession}
                                          className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                                          disabled={!isInitialized}
                                    >
                                          Join Meeting
                                    </button>
                              ) : (
                                    <>
                                          <button
                                                onClick={toggleAudio}
                                                className={`p-4 rounded-full ${isAudioOn ? 'bg-gray-200' : 'bg-red-500 text-white'}`}
                                          >
                                                {isAudioOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
                                          </button>
                                          <button
                                                onClick={toggleVideo}
                                                className={`p-4 rounded-full ${isVideoOn ? 'bg-gray-200' : 'bg-red-500 text-white'}`}
                                          >
                                                {isVideoOn ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
                                          </button>
                                          <button onClick={handleToggleScreenShare} className="p-4 rounded-full bg-gray-200">
                                                {isScreenShareOn ? <FaDesktop color="red" size={20} /> : <FaDesktop size={20} />}
                                          </button>
                                          <button
                                                onClick={leaveSession}
                                                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 flex items-center space-x-2"
                                          >
                                                <FaPhoneSlash size={16} />
                                                <span>End Meeting</span>
                                          </button>
                                    </>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default Meeting;
