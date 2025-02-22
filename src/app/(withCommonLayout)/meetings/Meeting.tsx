'use client';
import { message, Popconfirm, Tooltip } from 'antd';
import { useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaPhoneSlash } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
      setInitialized,
      setJoined,
      setVideoOn,
      setAudioOn,
      setScreenShareOn,
      incrementDuration,
      resetDuration,
} from '@/redux/features/meeting/meetingSlice';
import { meetingService } from '@/services/meetingService';

const Meeting = () => {
      const dispatch = useAppDispatch();
      const { isInitialized, isJoined, isVideoOn, isAudioOn, isScreenShareOn, duration, userName } = useAppSelector(
            (state) => state.meeting
      );

      const videoRef = useRef<HTMLVideoElement>(null);
      const screenShareRef = useRef<HTMLVideoElement>(null);
      const timerRef = useRef<NodeJS.Timeout>();

      // Initialize client
      useEffect(() => {
            const init = async () => {
                  const success = await meetingService.initializeClient();
                  if (success) {
                        dispatch(setInitialized(success));
                  } else {
                        message.error('Failed to initialize meeting client');
                  }
            };
            init();
            return () => {
                  meetingService.cleanup();
                  message.info('Meeting session cleaned up');
            };
      }, [dispatch]);

      // Handle duration timer
      useEffect(() => {
            if (isJoined) {
                  timerRef.current = setInterval(() => {
                        dispatch(incrementDuration());
                  }, 1000);
            } else {
                  if (timerRef.current) {
                        clearInterval(timerRef.current);
                        dispatch(resetDuration());
                  }
            }
            return () => {
                  if (timerRef.current) clearInterval(timerRef.current);
            };
      }, [isJoined, dispatch]);

      const formatTime = (seconds: number) => {
            const hrs = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      };

      const handleJoinSession = async () => {
            try {
                  const success = await meetingService.joinSession(userName);
                  if (success) {
                        dispatch(setJoined(true));
                        message.success('Successfully joined the meeting');

                        // Start video and audio
                        const videoSuccess = await meetingService.toggleVideo(videoRef.current);
                        dispatch(setVideoOn(videoSuccess));
                        if (!videoSuccess) {
                              message.warning('Failed to start video');
                        }

                        const audioSuccess = await meetingService.toggleAudio();
                        dispatch(setAudioOn(audioSuccess));
                        if (!audioSuccess) {
                              message.warning('Failed to start audio');
                        }
                  } else {
                        message.error('Failed to join the meeting');
                  }
            } catch (error) {
                  console.error('Failed to join session:', error);
                  message.error('An error occurred while joining the meeting');
            }
      };

      const handleLeaveSession = async () => {
            try {
                  if (isVideoOn) {
                        await meetingService.toggleVideo(null);
                        dispatch(setVideoOn(false));
                  }
                  if (isAudioOn) {
                        await meetingService.toggleAudio();
                        dispatch(setAudioOn(false));
                  }
                  if (isScreenShareOn) {
                        await meetingService.toggleScreenShare(screenShareRef.current);
                        dispatch(setScreenShareOn(false));
                  }

                  const success = await meetingService.leaveSession();
                  if (success) {
                        dispatch(setJoined(false));
                        message.success('Successfully left the meeting');
                  } else {
                        message.error('Failed to leave the meeting properly');
                  }
            } catch (error) {
                  console.error('Failed to leave session:', error);
                  message.error('An error occurred while leaving the meeting');
            }
      };

      const handleToggleVideo = async () => {
            try {
                  const success = await meetingService.toggleVideo(videoRef.current);
                  dispatch(setVideoOn(success));
                  message.info(`Video ${success ? 'started' : 'stopped'}`);
            } catch (error) {
                  console.error('Failed to toggle video:', error);
                  message.error('An error occurred while toggling video');
            }
      };

      const handleToggleAudio = async () => {
            try {
                  const success = await meetingService.toggleAudio();
                  dispatch(setAudioOn(success));
                  message.info(`Audio ${success ? 'unmuted' : 'muted'}`);
            } catch (error) {
                  console.error('Failed to toggle audio:', error);
                  message.error('An error occurred while toggling audio');
            }
      };

      const handleToggleScreenShare = async () => {
            try {
                  const success = await meetingService.toggleScreenShare(screenShareRef.current);
                  dispatch(setScreenShareOn(success));
                  message.info(`Screen sharing ${success ? 'started' : 'stopped'}`);
            } catch (error) {
                  console.error('Failed to toggle screen share:', error);
                  message.error('An error occurred while toggling screen share');
            }
      };

      return (
            <div className="container relative min-h-[80vh]  my-10">
                  <div className="">
                        <div className="flex-1 bg-gray-900 relative rounded-lg">
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
                              <video
                                    ref={screenShareRef}
                                    className={`absolute inset-0 w-full h-full object-contain ${isScreenShareOn ? 'block' : 'hidden'}`}
                                    playsInline
                              />
                        </div>

                        {/* Controls Bar */}
                        <div className="h-20  rounded-b-lg flex items-center justify-center space-x-6">
                              {!isJoined ? (
                                    <button
                                          onClick={handleJoinSession}
                                          className="px-6 py-2 bg-primary text-white rounded-full  disabled:opacity-50 disabled:cursor-not-allowed"
                                          disabled={!isInitialized}
                                    >
                                          {isInitialized ? 'Join Meeting' : 'Initializing...'}
                                    </button>
                              ) : (
                                    <>
                                          <Tooltip title={isAudioOn ? 'Mute Audio' : 'Unmute Audio'}>
                                                <button
                                                      onClick={handleToggleAudio}
                                                      className={`p-4 rounded-full ${isAudioOn ? 'bg-gray-200' : 'bg-red-500 text-white'}`}
                                                      title={isAudioOn ? 'Mute Audio' : 'Unmute Audio'}
                                                >
                                                      {isAudioOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
                                                </button>
                                          </Tooltip>
                                          <Tooltip title={isVideoOn ? 'Stop Video' : 'Start Video'}>
                                                <button
                                                      onClick={handleToggleVideo}
                                                      className={`p-4 rounded-full ${isVideoOn ? 'bg-gray-200' : 'bg-red-500 text-white'}`}
                                                >
                                                      {isVideoOn ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
                                                </button>
                                          </Tooltip>
                                          <Tooltip title={isScreenShareOn ? 'Stop Sharing' : 'Share Screen'}>
                                                <button
                                                      onClick={handleToggleScreenShare}
                                                      className={`p-4 rounded-full ${
                                                            isScreenShareOn ? 'bg-red-500 text-white' : 'bg-gray-200'
                                                      }`}
                                                >
                                                      <FaDesktop size={20} />
                                                </button>
                                          </Tooltip>
                                          <Popconfirm title="Are you sure you want to end the meeting?" onConfirm={handleLeaveSession}>
                                                <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 flex items-center space-x-2">
                                                      <FaPhoneSlash size={16} />
                                                      <span>End Meeting</span>
                                                </button>
                                          </Popconfirm>
                                    </>
                              )}
                        </div>
                  </div>
            </div>
      );
};

export default Meeting;
