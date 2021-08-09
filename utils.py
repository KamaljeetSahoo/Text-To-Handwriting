import cv2
import numpy as np
import os
import base64
from fpdf import FPDF

cols = 50
total_rows = 32
blank_char = (np.ones((90, 40, 3))*255).astype(np.uint8)
blank_row = (np.ones((90, 2040, 3))*255).astype(np.uint8)
space_char = cv2.resize(cv2.imread('fonts/space.png'), (40, 90))


def generate_file_dict():
    file_dict = {}
    file_dict[32] = 'space.png'
    file_dict[46] = 'fullstop.png'
    file_dict[45] = 'hiphen.png'
    file_dict[44] = 'comma.png'
    file_dict[41] = 'bracketclose.png'
    file_dict[40] = 'bracketopen.png'
    for i in range(97, 123):
        file_dict[i] = chr(i)+'.png'
    for i in range(65, 91):
        file_dict[i] = chr(i).lower()+'upper.png'
    for i in range(48, 58):
        file_dict[i] = chr(i)+'.png'
    return file_dict


def process_text(input_text):
    non_required_chars = {"'"}
    allowed_chars = set(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.( )')
    process_text = ''
    for i in input_text:
        if i == '\n':
            process_text += ' '
        elif i in allowed_chars:
            process_text += i

    words = process_text.split(' ')
    for i in range(50):
        words.append(' ')

    return process_text, words


file_dict = generate_file_dict()


def generate_images(words):
    row_counter = 0
    col_counter = 0
    curr_row = blank_char
    rows = []
    for word in words:
        if len(word) < cols-col_counter:
            for i in word:
                file_name = file_dict[ord(i)]
                char_img = cv2.imread('fonts/'+file_name)
                char_img = cv2.resize(char_img, (40, 90))
                curr_row = np.hstack((curr_row, char_img))
                col_counter += 1
            curr_row = np.hstack((curr_row, space_char))
            col_counter += 1
        else:
            while(cols-col_counter):
                # add blank character
                curr_row = np.hstack((curr_row, blank_char))
                col_counter += 1
            rows.append(curr_row)
            curr_row = blank_char
            col_counter = 0

    final_pages = []
    i = 0
    row_counter = 0
    while(row_counter < len(rows)):
        i = 0
        final_img = rows[row_counter]
        while(i < total_rows and row_counter < len(rows)):
            i += 1
            row_counter += 1
            if row_counter < len(rows):
                final_img = np.vstack((final_img, rows[row_counter]))
        row_counter += 1
        final_pages.append(final_img)

    while(i <= total_rows):
        final_pages[-1] = np.vstack((final_pages[-1], blank_row))
        i += 1

    return final_pages


def generate_pdf(final_pages):
    files = os.listdir('output')
    for i in files:
        os.remove('output/'+i)
    for i in range(len(final_pages)):
        cv2.imwrite('output/page_'+str(i+1)+'.jpg', final_pages[i])

    files = os.listdir('output')
    x_margin = 10
    y_margin = 10
    pdf = FPDF(format=(200+2*x_margin, 220+2*y_margin))
    for i in files:
        pdf.add_page()
        pdf.image('output/'+i, w=200, h=220, x=x_margin, y=y_margin)
    val = pdf.output(dest="S").encode("latin-1")

    b64 = base64.b64encode(val)
    filename = 'Output'
    return f'<a href="data:application/octet-stream;base64,{b64.decode()}" download="{filename}.pdf">Download file</a>'
