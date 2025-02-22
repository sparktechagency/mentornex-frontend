import ZoomVideo from '@zoom/videosdk';
import { message } from 'antd';
import { generateVideoToken } from '@/utils/generateVideoToken';

const sdkKey = 'hnZyzxPrkfUjMq6Je0u8iVAQ6mLAJ4RwP6eg';
const sdkSecret = 'AelZJtVlk4k3WgZJaJAtqPtAhYDW3H39RM8j';
const sessionName = 'test-session';
const role = 1;

let client: ReturnType<typeof ZoomVideo.createClient> | null = null;
let isAudioStarted = false;
let isScreenSharing = false;

export const meetingService = {
      initializeClient: async () => {
            try {
                  client = ZoomVideo.createClient();
                  await client.init('en-US', 'Global', {
                        webEndpoint: 'zoom.us',
                        patchJsMedia: false,
                        enforceMultipleVideos: false,
                        stayAwake: false,
                  });
                  return true;
            } catch (error) {
                  console.error('❌ Error initializing client:', error);
                  return false;
            }
      },

      joinSession: async (userName: string) => {
            try {
                  if (!client) return false;
                  const token = generateVideoToken(sdkKey, sdkSecret, sessionName, role);
                  await client.join(sessionName, token, userName);
                  return true;
            } catch (error) {
                  console.error('❌ Error joining session:', error);
                  return false;
            }
      },

      toggleVideo: async (videoElement: HTMLVideoElement | null) => {
            try {
                  if (!client) return false;
                  const stream = client.getMediaStream();
                  const devices = await navigator.mediaDevices.enumerateDevices();
                  const hasCamera = devices.some((device) => device.kind === 'videoinput');

                  if (!hasCamera) {
                        message.error('Camera not found. Please connect a camera and try again.');
                        return false;
                  }

                  const isVideoOn = await stream.isCapturingVideo();
                  if (isVideoOn) {
                        await stream.stopVideo();
                  } else {
                        await navigator.mediaDevices.getUserMedia({ video: true });
                        await stream.startVideo();
                        if (videoElement) {
                              stream.renderVideo(videoElement, client.getCurrentUserInfo().userId, 640, 360, 0, 0, 2);
                        }
                  }
                  return !isVideoOn;
            } catch (error) {
                  console.error('❌ Error toggling video:', error);
                  message.error('An error occurred while toggling video.');
                  return false;
            }
      },

      toggleAudio: async () => {
            try {
                  if (!client) return false;
                  const stream = client.getMediaStream();

                  try {
                        if (isAudioStarted) {
                              await stream.stopAudio();
                              isAudioStarted = false;
                        } else {
                              await navigator.mediaDevices.getUserMedia({ audio: true });
                              await stream.startAudio();
                              isAudioStarted = true;
                        }
                        return isAudioStarted;
                  } catch (error: any) {
                        if (error.toString().includes('audio is already')) {
                              await stream.stopAudio();
                              isAudioStarted = false;
                              return false;
                        }
                        throw error;
                  }
            } catch (error) {
                  console.error('❌ Error toggling audio:', error);
                  message.error('An error occurred while toggling audio.');
                  return false;
            }
      },

      toggleScreenShare: async (screenShareElement: HTMLVideoElement | null) => {
            try {
                  if (!client || !screenShareElement) return false;
                  const stream = client.getMediaStream();

                  try {
                        if (isScreenSharing) {
                              await stream.stopShareScreen();
                              isScreenSharing = false;
                        } else {
                              await stream.startShareScreen(screenShareElement);
                              isScreenSharing = true;
                        }
                        return isScreenSharing;
                  } catch (error: any) {
                        if (error.toString().includes('already started')) {
                              await stream.stopShareScreen();
                              isScreenSharing = false;
                              return false;
                        }
                        // Handle user cancellation
                        if (error.name === 'NotAllowedError' || error.name === 'AbortError') {
                              message.info('Screen sharing was cancelled.');
                              isScreenSharing = false;
                              return false;
                        }
                        throw error;
                  }
            } catch (error) {
                  console.error('❌ Error sharing screen:', error);
                  message.error('An error occurred while sharing screen.');
                  isScreenSharing = false;
                  return false;
            }
      },

      leaveSession: async () => {
            try {
                  if (!client) return false;
                  await client.leave();
                  isAudioStarted = false;
                  isScreenSharing = false;
                  return true;
            } catch (error) {
                  console.error('❌ Error leaving session:', error);
                  return false;
            }
      },

      cleanup: () => {
            if (client) {
                  client.leave();
                  client = null;
                  isAudioStarted = false;
                  isScreenSharing = false;
            }
      },
};
