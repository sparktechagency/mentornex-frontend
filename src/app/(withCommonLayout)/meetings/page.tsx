'use client';
import { generateVideoToken } from '@/utils/generateVideoToken';
// import './App.css';
import ZoomVideo from '@zoom/videosdk';
import { message } from 'antd';

import { useState, useRef } from 'react';

let client: any = null;

const VideoSDKApp = () => {
      const sdkKey = 'hnZyzxPrkfUjMq6Je0u8iVAQ6mLAJ4RwP6eg';
      const sdkSecret = 'AelZJtVlk4k3WgZJaJAtqPtAhYDW3H39RM8j';
      const sessionName = 'test-session';
      const [isInitialized, setIsInitialized] = useState(false);
      const [isJoined, setIsJoined] = useState(false);
      const [isVideoOn, setIsVideoOn] = useState(false);
      const [isAudioOn, setIsAudioOn] = useState(false);
      const videoRef = useRef<HTMLVideoElement>(null);

      const role = 0;
      const userName = 'React';

      // Request permissions before initializing client
      //   useEffect(() => {
      //         if (navigator.mediaDevices) {
      //               navigator.mediaDevices
      //                     .getUserMedia({ video: true, audio: true })
      //                     .then((stream) => {
      //                           stream.getTracks().forEach((track) => track.stop());
      //                           console.log('✅ Media permissions granted');
      //                     })
      //                     .catch((err) => {
      //                           console.warn('⚠️ Media permissions not granted:', err);
      //                     });
      //         }
      //   }, []);

      const initializeClient = async () => {
            try {
                  client = ZoomVideo.createClient();

                  await client.init('en-US', 'Global', {
                        webEndpoint: 'zoom.us',
                        patchJsMedia: false, // Disable advanced media patching
                        enforceMultipleVideos: false,
                        stayAwake: false,
                        videoDegradationPreference: 'MAINTAIN_FRAMERATE',
                        videoQuality: {
                              width: 640,
                              height: 360,
                              frameRate: 30,
                        },
                        disableShareScreen: true,
                  });

                  console.log('✅ Video SDK client initialized');
                  setIsInitialized(true);
            } catch (error) {
                  console.error('❌ Error initializing client:', error);
            }
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

      return (
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                  <main className="max-w-7xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900">Zoom Video SDK Sample React</h1>
                        <div className="mt-8 flex flex-col lg:flex-row">
                              <div className="flex flex-col w-full lg:w-1/2">
                                    <button
                                          onClick={initializeClient}
                                          className={`${
                                                isInitialized ? 'bg-gray-200' : 'bg-indigo-600'
                                          } px-4 py-2 rounded-md text-white font-semibold`}
                                          disabled={isInitialized}
                                    >
                                          {isInitialized ? '✅ Client Initialized' : 'Initialize Client'}
                                    </button>
                                    <button
                                          onClick={joinSession}
                                          className={`${
                                                isInitialized && !isJoined ? 'bg-green-600' : 'bg-gray-200'
                                          } px-4 py-2 rounded-md text-white font-semibold mt-4`}
                                          disabled={!isInitialized || isJoined}
                                    >
                                          Join Session
                                    </button>
                                    <button
                                          onClick={leaveSession}
                                          className={`${
                                                isJoined ? 'bg-red-600' : 'bg-gray-200'
                                          } px-4 py-2 rounded-md text-white font-semibold mt-4`}
                                          disabled={!isJoined}
                                    >
                                          Leave Session
                                    </button>
                              </div>
                              <div className="flex flex-col w-full lg:w-1/2 mt-8 lg:mt-0">
                                    {isJoined && (
                                          <>
                                                <button
                                                      onClick={toggleVideo}
                                                      className={`${
                                                            isVideoOn ? 'bg-red-600' : 'bg-green-600'
                                                      } px-4 py-2 rounded-md text-white font-semibold`}
                                                >
                                                      {isVideoOn ? 'Stop Video' : 'Start Video'}
                                                </button>
                                                <button
                                                      onClick={toggleAudio}
                                                      className={`${
                                                            isAudioOn ? 'bg-red-600' : 'bg-green-600'
                                                      } px-4 py-2 rounded-md text-white font-semibold mt-4`}
                                                >
                                                      {isAudioOn ? 'Mute' : 'Unmute'}
                                                </button>
                                          </>
                                    )}
                              </div>
                        </div>
                        <div className="mt-12">
                              <video
                                    ref={videoRef}
                                    id="self-view-video"
                                    width="640"
                                    height="360"
                                    style={{ backgroundColor: 'black' }}
                                    playsInline
                                    muted // Add muted to avoid feedback
                                    className="rounded-lg shadow-lg"
                              />
                        </div>
                  </main>
            </div>
      );
};

export default VideoSDKApp;
