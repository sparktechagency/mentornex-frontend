import { PlaySquare } from 'lucide-react';

type Props = {
      title: string;
      url: string;
      createdAt: string;
      _id: string;
};
const PremiumContent = ({ contents }: { contents: Props[] }) => {
      return (
            <div>
                  <div className="bg-white w-80 space-y-4">
                        {contents?.map((item, i) => (
                              <div key={item?._id} className="flex justify-between border rounded-lg p-2">
                                    <div className="flex gap-1">
                                          <h2>{i + 1}.</h2>
                                          <h3 className="font-medium">{item?.title}</h3>
                                    </div>
                                    <div>
                                          <button onClick={() => window.open(item?.url, '_blank')}>
                                                <PlaySquare className="text-gray-400 cursor-pointer" />
                                          </button>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default PremiumContent;
