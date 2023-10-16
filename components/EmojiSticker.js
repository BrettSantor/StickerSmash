import { View, Image } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  TapGestureHandler,
  PanGestureHandler
} from "react-native-gesture-handler";
import { useContext } from "react";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

export default function EmojiSticker({ imageSize, stickerSource }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const pressed = useSharedValue(false);

  const scaleImage = useSharedValue(1);

  // const onDoubleTap = useAnimatedGestureHandler({
  //   onActive: () => {
  //     console.log("push me")
  //     if (!pressed.value) {
  //       if (scaleImage.value !== 2) {
  //         scaleImage.value = withSpring(2);
  //       } else {
  //         scaleImage.value = withSpring(1);
  //       }
  //     }
  //   },
  // });

  const doubleTap = Gesture.Tap()
  .maxDuration(250)
  .numberOfTaps(2)
  .onStart(() => {
    console.log("push me")
    if (!pressed.value) {
      if (scaleImage.value !== 2) {
        scaleImage.value = withSpring(2);
      } else {
        scaleImage.value = withSpring(1);
      }
    }
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
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart: (_, context) => {
  //     context.translateX = translateX.value;
  //     context.translateY = translateY.value;
  //     pressed.value = true;
  //   },
  //   onActive: (event, context) => {
  //     translateX.value = event.translationX + context.translateX;
  //     translateY.value = event.translationY + context.translateY;
  //   },
  //   onEnd: () => {
  //     pressed.value = false;
  //   },
  // });

  const pan = Gesture.Pan()
    .onBegin((event)=>{
        console.log("this is start", translateX.value, translateY.value)
        pressed.value = true;
    })
    .onChange((event)=>{
        console.log("Active!!!", event.x, event.y)
        translateX.value = event.x;
        translateY.value = event.y;
    })
    .onFinalize(()=>{
      console.log("this is onFinalize")
        pressed.value = false;
    })

  return (
    <GestureDetector gesture={Gesture.Exclusive(pan, doubleTap)}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        {/* <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}> */}
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        {/* </TapGestureHandler> */}
      </AnimatedView>
    </GestureDetector>
  );
}