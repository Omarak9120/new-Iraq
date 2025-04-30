import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Eye } from 'lucide-react';

interface CandidateCardProps {
  name: string;
  party: string;
  image: string;
  likes: number;
  comments: number;
  views: number;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  name,
  party,
  image,
  likes,
  comments,
  views,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [smallImageError, setSmallImageError] = React.useState(false);

  const SmileFace = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full text-gray-400"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );

  return (
    <div className="main group">
      <div className="card">
        <div className="fl">
          <div className="fullscreen">
            <svg viewBox="0 0 100 100" className="fullscreen_svg">
              <path d="M3.563-.004a3.573 3.573 0 0 0-3.527 4.09l-.004-.02v28.141c0 1.973 1.602 3.57 3.57 3.57s3.57-1.598 3.57-3.57V12.218v.004l22.461 22.461a3.571 3.571 0 0 0 6.093-2.527c0-.988-.398-1.879-1.047-2.523L12.218 7.172h19.989c1.973 0 3.57-1.602 3.57-3.57s-1.598-3.57-3.57-3.57H4.035a3.008 3.008 0 0 0-.473-.035zM96.333 0l-.398.035.02-.004h-28.16a3.569 3.569 0 0 0-3.57 3.57 3.569 3.569 0 0 0 3.57 3.57h19.989L65.323 29.632a3.555 3.555 0 0 0-1.047 2.523 3.571 3.571 0 0 0 6.093 2.527L92.83 12.221v19.985a3.569 3.569 0 0 0 3.57 3.57 3.569 3.569 0 0 0 3.57-3.57V4.034v.004a3.569 3.569 0 0 0-3.539-4.043l-.105.004zM3.548 64.23A3.573 3.573 0 0 0 .029 67.8v28.626-.004l.016.305-.004-.016.004.059v-.012l.039.289-.004-.023.023.121-.004-.023c.074.348.191.656.34.938l-.008-.02.055.098-.008-.02.148.242-.008-.012.055.082-.008-.012c.199.285.43.531.688.742l.008.008.031.027.004.004c.582.461 1.32.742 2.121.762h.004l.078.004h28.61a3.569 3.569 0 0 0 3.57-3.57 3.569 3.569 0 0 0-3.57-3.57H12.224l22.461-22.461a3.569 3.569 0 0 0-2.492-6.125l-.105.004h.008a3.562 3.562 0 0 0-2.453 1.074L7.182 87.778V67.793a3.571 3.571 0 0 0-3.57-3.57h-.055.004zm92.805 0a3.573 3.573 0 0 0-3.519 3.57v19.993-.004L70.373 65.328a3.553 3.553 0 0 0-2.559-1.082h-.004a3.573 3.573 0 0 0-3.566 3.57c0 1.004.414 1.91 1.082 2.555l22.461 22.461H67.802a3.57 3.57 0 1 0 0 7.14h28.606c.375 0 .742-.059 1.082-.168l-.023.008.027-.012-.02.008.352-.129-.023.008.039-.02-.02.008.32-.156-.02.008.023-.016-.008.008c.184-.102.34-.207.488-.32l-.008.008.137-.113-.008.004.223-.211.008-.008c.156-.164.301-.34.422-.535l.008-.016-.008.016.008-.02.164-.285.008-.02-.008.016.008-.02c.098-.188.184-.406.246-.633l.008-.023-.004.008.008-.023a3.44 3.44 0 0 0 .121-.852v-.004l.004-.078V67.804a3.569 3.569 0 0 0-3.57-3.57h-.055.004z" />
            </svg>
          </div>
        </div>
        <div className="card_content">
          <img 
            src="/image.png" 
            alt="Default" 
            className="w-full h-full object-cover rounded-lg -mt-14"
          />
        </div>
        <div className="card_back"></div>
      </div>
      <div className="data">
        <div className="img">
          {smallImageError ? (
            <SmileFace />
          ) : (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={() => setSmallImageError(true)}
            />
          )}
        </div>
        <div className="text">
          <div className="text_m">{name}</div>
          <div className="text_s">{party}</div>
        </div>
      </div>
      <div className="btns">
        <div className="likes">
          <Heart className="likes_svg" size={12} />
          <span className="likes_text">{likes}</span>
        </div>
        <div className="comments">
          <MessageCircle className="comments_svg" size={12} />
          <span className="comments_text">{comments}</span>
        </div>
        <div className="views">
          <Eye className="views_svg" size={12} />
          <span className="views_text">{views}</span>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard; 