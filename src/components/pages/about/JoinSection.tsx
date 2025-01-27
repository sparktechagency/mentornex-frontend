import { Button } from 'antd';
import React from 'react';

const JoinSection = () => {
      return (
            <div className=" bg-gradient-image py-16 px-8 text-white  rounded-xl shadow-lg">
                  <div className="space-y-4">
                        <h2 className=" w-full text-xl mx-auto md:mx-20">
                              Whether you’re a mentor eager to make a difference or someone looking for guidance to shape your future,
                              MENTORNEX is where you’ll find a community ready to support, inspire, and uplift. Let’s grow together.
                        </h2>
                  </div>
                  <div className="flex justify-center items-center mt-4">
                        <Button type="primary">Join Now</Button>
                  </div>
            </div>
      );
};

export default JoinSection;
