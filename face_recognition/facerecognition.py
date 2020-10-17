import argparse
import os
import numpy as np
import face_recognition
import imutils
import pickle
import cv2
from imutils import paths
from googletrans import Translator
from PIL import ImageFont, ImageDraw, Image


# construct the argument parser and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--dataset", required=True,
                help="path to input directory of faces + images")
ap.add_argument("-e", "--encodings", required=True,
                help="path to serialized database of encodings")
ap.add_argument("-p", "--person", required=True, type=str,
                help="the name of the person you want to surprise")
ap.add_argument("-d", "--detectionmethod", type=str, default="hog",
                help="face detection model to use: hog or cnn")
args = vars(ap.parse_args())


def encode():
    # grab the paths to the input images in our dataset
    print("[INFO] quantifying faces...")
    imagePaths = list(paths.list_images(args["dataset"]))

    # initialize the list of known encodings and known names
    knownEncodings = []
    knownNames = []

    # loop over image paths
    for (i, imagePath) in enumerate(imagePaths):
        # extract the person name from the image path
        print("[INFO] processing image {}/{}".format(i+1, len(imagePaths)))
        name = imagePath.split(os.path.sep)[-2]

        # load the input image and convert it from BGR (OpenCV ordering)
        # to dlib ordering (RGB) and resize them for fast processing
        image = cv2.imread(imagePath)
        resize = imutils.resize(image, width=720, height=960)
        rgb = cv2.cvtColor(resize, cv2.COLOR_BGR2RGB)

        # detect the (x, y)-coordinates of the bounding boxes
        # corresponding to each face in the input image
        boxes = face_recognition.face_locations(
            rgb, model=args["detectionmethod"])

        # compute the facial embedding for the face
        encodings = face_recognition.face_encodings(rgb, boxes)

        # loop over the encodings
        for encoding in encodings:
            # add each encoding + name to our set of known names and
            # encodings
            knownEncodings.append(encoding)
            knownNames.append(name)
        # dump the facial encodings + names to disk
    print("[INFO] serializing encodings...")
    data = {"encodings": knownEncodings, "names": knownNames}
    f = open(args["encodings"], "wb")
    f.write(pickle.dumps(data))
    f.close()


def capture():
    # load the known faces and embeddings
    print("[INFO] loading encodings...")
    data = pickle.loads(open(args["encodings"], "rb").read())
    names = []
    # initialize the video stream and pointer to output video file, then
    # allow the camera sensor to warm up
    print("[INFO] starting video stream...")
    vs = cv2.VideoCapture(0)
    vs.set(3, 1280)
    vs.set(4, 720)

    while True:
        # grab the frame from the threaded video stream
        ret, frame = vs.read()

        # convert the input frame from BGR to RGB then resize it to have
        # a width of 750px (to speedup processing)
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        rgb = imutils.resize(frame, width=720, height=480)
        r = frame.shape[1]/720

        # detect the (x, y)-coordinates of the bounding boxes
        # corresponding to each face in the input frame, then compute
        # the facial embeddings for each face
        boxes = face_recognition.face_locations(
            rgb, model=args["detectionmethod"])
        encodings = face_recognition.face_encodings(rgb, boxes)
        names = []

        # loop over the facial embeddings
        for encoding in encodings:
            # attempt to match each face in the input image to our known
            # encodings
            matches = face_recognition.compare_faces(data["encodings"],
                                                     encoding)
            name = "Unknown"
            # check to see if we have found a match
            if True in matches:
                # find the indexes of all matched faces then initialize a
                # dictionary to count the total number of times each face
                # was matched
                matchedIdxs = [i for (i, b) in enumerate(matches) if b]
                counts = {}

                # loop over the matched indexes and maintain a count for
                # each recognized face face
                for i in matchedIdxs:
                    name = data["names"][i]
                    counts[name] = counts.get(name, 0) + 1

                # determine the recognized face with the largest number
                # of votes (note: in the event of an unlikely tie Python
                # will select first entry in the dictionary)
                name = max(counts, key=counts.get)
                translater = Translator()
                name = translater.translate(name, src='en', dest='ar')

            # update the list of names
            names.append(name)

            # loop over the recognized faces
        for ((top, right, bottom, left), name) in zip(boxes, names):

            # rescale the face coordinates
            top = int(top * r)
            right = int(right * r)
            bottom = int(bottom * r)
            left = int(left * r)

            # draw the predicted face name on the image
            cv2.rectangle(frame, (left, top), (right, bottom),
                          (0, 255, 0), 2)
            y = top - 15 if top - 15 > 15 else top + 15
            fontpath = "./Amiri-Regular.ttf"
            font = ImageFont.truetype(fontpath, 32)
            img_pil = Image.fromarray(frame)
            draw = ImageDraw.Draw(img_pil)
            draw.text((50, 80),  name.text, font=font, fill=(0, 255, 0, 0))
            '''cv2.putText(frame, name, (left, y), cv2.FONT_HERSHEY_SIMPLEX,
                        0.75, (0, 255, 0), 2)'''
            print(name.text)

            # check to see if we are supposed to display the output frame to
            # the screen
        for name in names:
            if args["person"] == name:
                cv2.imshow("Frame", frame)
                cv2.waitKey(3000)
                vs.release()
                cv2.destroyAllWindows()
                cap = cv2.VideoCapture('test.mp4')

                # Check if camera opened successfully
                if (cap.isOpened() == False):
                    print("Error opening video  file")

                    # Read until video is completed
                while(cap.isOpened()):

                    # Capture frame-by-frame
                    ret, frame = cap.read()
                    if ret == True:

                        # Display the resulting frame
                        cv2.imshow('Frame', frame)

                        # Press Q on keyboard to  exit
                        if cv2.waitKey(1) & 0xFF == ord('q'):
                            break

                        # Break the loop
                    else:
                        break

                    # When everything done, release
                    # the video capture object
                cap.release()
                cv2.destroyAllWindows()

        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF

        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break
    # do a bit of cleanup
    vs.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    encode()
    capture()
