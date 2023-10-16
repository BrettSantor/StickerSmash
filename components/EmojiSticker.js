import { View, Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

export default function EmojiSticker({ imageSize, stickerSource }) {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const pressed = useSharedValue(false);

  const scaleImage = useSharedValue(1);

  const doubleTap = Gesture.Tap()
  .maxDuration(250)
  .numberOfTaps(2)
  .onStart(() => {
    console.log("Double-tap detected");
    scaleImage.value = withTiming(scaleImage.value === 1 ? 2 : 1);
    // if (!pressed.value) {
    // }
  });

  const pan = Gesture.Pan()
    .onBegin(()=>{
        console.log("this is start", offsetX.value, offsetY.value)
        pressed.value = true;
    })
    .onChange((event)=>{
        console.log("Active!!!", event.translationX, event.translationY)
        offsetX.value = event.translationX;
        offsetY.value = event.translationY;
    })
    .onFinalize((event)=>{
      console.log("this is onFinalize", offsetX.value, offsetY.value)
        pressed.value = false;
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleImage.value }],
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offsetX.value,
        },
        {
          translateY: offsetY.value,
        },
      ],
    };
  });


  return (
    <GestureDetector gesture={Gesture.Exclusive( doubleTap, pan)}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
      </AnimatedView>
    </GestureDetector>
  );
};