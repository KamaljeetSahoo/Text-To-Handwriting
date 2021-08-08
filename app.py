import streamlit as st
import cv2
import numpy as np
import os
import base64
from fpdf import FPDF
from utils import process_text, generate_images, generate_pdf

st.header('Text to Handwritting')

input_text = st.text_area('Enter Your Text Here', height=200)

if st.checkbox('Show Input Text'):
    st.write(input_text)

if st.checkbox('Convert'):
    processed_text, words = process_text(input_text)
    final_images = generate_images(words)

    if st.checkbox('Show Images'):
        for i in range(len(final_images)):
            st.image(final_images[i], 'page_'+str(i+1), channels='BGR')

    if st.button('Download PDF'):
        link = generate_pdf(final_images)
        st.markdown(link, unsafe_allow_html=True)
