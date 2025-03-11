import { PlaySquare } from 'lucide-react';

const PremiumContent = () => {
      return (
            <div>
                  <div className="bg-white w-80 space-y-4">
                        {[1, 2, 3, 4, 5].map((item, i) => (
                              <div key={item} className="flex justify-between border rounded-lg p-2">
                                    <div className="flex gap-1">
                                          <h2>{i + 1}.</h2>
                                          <h3 className="font-medium">This is title</h3>
                                    </div>
                                    <div>
                                          <PlaySquare className="text-gray-400 cursor-pointer" />
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default PremiumContent;
