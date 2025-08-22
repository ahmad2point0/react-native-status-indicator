import React from "react";
import { View } from "react-native";

interface StatusIndicatorProps {
  size: "sm" | "md" | "lg" | number; // predefined Tailwind sizes or custom number
  color: string;                     // Color names (red, blue) or hex codes (#FF0000, #00FF00, etc.)
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  size,
  color,
}) => {
  // Map predefined sizes to Tailwind classes
  const predefinedSizeMap = {
    sm: { dot: "w-2 h-2", ping: "w-4 h-4" },
    md: { dot: "w-3 h-3", ping: "w-6 h-6" },
    lg: { dot: "w-4 h-4", ping: "w-8 h-8" },
  };

  // Determine if size is predefined or custom
  const isCustomSize = typeof size === "number";
  
  // Get dot and ping dimensions
  const getDimensions = () => {
    if (isCustomSize) {
      const dotSize = size;
      const pingSize = size * 2;
      return {
        dot: { width: dotSize, height: dotSize },
        ping: { width: pingSize, height: pingSize },
        isCustom: true
      };
    } else {
      return {
        dot: predefinedSizeMap[size as keyof typeof predefinedSizeMap].dot,
        ping: predefinedSizeMap[size as keyof typeof predefinedSizeMap].ping,
        isCustom: false
      };
    }
  };

  const dimensions = getDimensions();

  return (
    <View className="flex flex-row items-center justify-center">
      {/* Solid dot */}
      <View
        className={dimensions.isCustom ? "rounded-full" : `${dimensions.dot} rounded-full`}
        style={dimensions.isCustom ? { ...dimensions.dot as any, backgroundColor: color } : { backgroundColor: color }}
      />
      {/* Ping ring */}
      <View
        className={dimensions.isCustom ? "rounded-full absolute animate-ping" : `${dimensions.ping} rounded-full absolute animate-ping`}
        style={dimensions.isCustom ? { ...dimensions.ping as any, backgroundColor: color, opacity: 0.7 } : { backgroundColor: color, opacity: 0.7 }}
      />
    </View>
  );
};
