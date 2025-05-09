'use client';
import React, { useRef, useEffect, useCallback } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useAppSelector } from '@/redux/hooks';
import { useGetUserProfileQuery } from '@/redux/features/user/userApi';

const SessionPage: React.FC = () => {
      const { user } = useAppSelector((state) => state.auth);
      const { data: userProfile } = useGetUserProfileQuery(undefined, {
            skip: !user,
      });
      console.log('userProfile', userProfile);
      const containerRef = useRef<HTMLDivElement>(null);

      const myMeeting = useCallback(
            async (element: HTMLDivElement | null) => {
                  if (!element || !user) return;

                  try {
                        const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID);
                        const roomID = '111111';
                        const userid = userProfile?._id;

                        const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVER_SECRET!;
                        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                              appID,
                              serverSecret,
                              roomID,
                              userid as string,
                              userProfile?.name as string
                        );

                        const zp = ZegoUIKitPrebuilt.create(kitToken);
                        const devices = await navigator.mediaDevices.enumerateDevices();
                        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
                        const audioDevices = devices.filter((device) => device.kind === 'audioinput');
                        console.log('Video devices:', videoDevices);
                        console.log('Audio devices:', audioDevices);

                        const constraints = {
                              audio: {
                                    deviceId: { exact: 'f2e29fa24d65893b85d3cea8eed546fe5fd2457d0588c821eabf6ad63bd44ff0' }, // Use the specific deviceId
                              },
                        };

                        navigator.mediaDevices
                              .getUserMedia(constraints)
                              .then((stream) => {
                                    console.log('User media stream:', stream);
                              })
                              .catch((error) => {
                                    console.error('Error accessing media devices:', error);
                              });

                        zp.joinRoom({
                              container: element,
                              sharedLinks: [
                                    {
                                          name: 'Personal link',
                                          url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
                                    },
                              ],
                              scenario: {
                                    mode: ZegoUIKitPrebuilt.VideoConference,
                              },

                              // extra features
                              turnOnCameraWhenJoining: false,
                              turnOnMicrophoneWhenJoining: false,
                              showPreJoinView: false,
                              maxUsers: 2,

                              // custom login
                              onJoinRoom() {
                                    alert('Joined the meeting!');
                              },
                        });
                  } catch (error) {
                        console.error('Error during meeting setup:', error);
                        alert('Failed to join the meeting. Please check your setup and try again.');
                  }
            },
            [user]
      );

      useEffect(() => {
            if (containerRef.current) {
                  myMeeting(containerRef.current);
            }
      }, [containerRef, myMeeting]);

      return (
            <div className="">
                  <div className="w-full h-[calc(100vh-80px)]" ref={containerRef} />
            </div>
      );
};

export default SessionPage;
