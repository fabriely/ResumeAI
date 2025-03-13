import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, PDFViewer} from '@react-pdf/renderer';

// Register a font with bold style
Font.register({
  family: 'Poppins',
  src: 'https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJbecmNE.woff2'
});


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontSize: 12, // Set default font size to 12
    paddingBottom: 50, // Add padding to avoid overlap with footer
    paddingTop: 50 // Add padding to avoid overlap with header
  },
  section: {
    marginHorizontal: 50, // Right and left margins
    marginVertical: 30, // Top and bottom margins
    padding: 10,
    flexGrow: 1
  },
  viewerContainer: {
    height: 'calc(100vh - 50px)', // Adjust this value based on the height of the options bar
    width: 'calc(100vw - 15px)'
  },
  viewer: {
    width: '100%',
    height: '100%'
  },
  bold: {
    fontFamily: 'Poppins',
  },
  h1: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  h2: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  h3: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  h4: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  h5: {
    fontSize: 8,
    fontWeight: 'bold'
  },
  h6: {
    fontSize: 6,
    fontWeight: 'bold'
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  justify: {
    textAlign: 'justify'
  },
  bullet: {
    marginLeft: 10,
    marginRight: 10
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10
  }
});

// Function to render text with bold and header replacements
const renderTextWithBoldAndHeaders = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|######.*|#####.*|####.*|###.*|##.*|#.*|-.*)/g);
  const elements = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (part.startsWith('**') && part.endsWith('**:')) {
      elements.push(
        <Text key={i} style={[styles.bold, styles.justify]}>
          {part.slice(2, -3)}:
        </Text>
      );
    } else if (part.startsWith('**') && part.endsWith('**')) {
      elements.push(
        <Text key={i} style={[styles.bold, styles.justify]}>
          {part.slice(2, -2)}
        </Text>
      );
    } else if (part.startsWith('######')) {
      elements.push(
        <Text key={i} style={[styles.h6, styles.justify]}>
          {part.slice(6).trim()}
        </Text>
      );
    } else if (part.startsWith('#####')) {
      elements.push(
        <Text key={i} style={[styles.h5, styles.justify]}>
          {part.slice(5).trim()}
        </Text>
      );
    } else if (part.startsWith('####')) {
      elements.push(
        <Text key={i} style={[styles.h4, styles.justify]}>
          {part.slice(4).trim()}
        </Text>
      );
    } else if (part.startsWith('###')) {
      elements.push(
        <Text key={i} style={[styles.h3, styles.justify]}>
          {part.slice(3).trim()}
        </Text>
      );
    } else if (part.startsWith('##')) {
      elements.push(
        <Text key={i} style={[styles.h2, styles.justify, styles.bold, styles.bold]}>
          {part.slice(2).trim()}
        </Text>
      );
    } else if (part.startsWith('#')) {
      elements.push(
        <Text key={i} style={[styles.h1, styles.justify, styles.bold]}>
          {part.slice(1).trim()}
        </Text>
      );
    } else if (part.startsWith('-')) {
      elements.push(
        <Text key={i} style={[styles.justify, styles.bullet]}>
          • {part.slice(1).trim()}
        </Text>
      );
    } else {
      elements.push(
        <Text key={i} style={styles.justify}>
          {part}
        </Text>
      );
    }
  }

  return elements;
};

// Create Document Component
const MyDocument = ({ id, summaryContent }: { id: number, summaryContent: string }) => (
  <Document title={`Resumo ${id}`}>
    <Page size="A4" style={styles.page}>
            <View style={styles.section}>
        {renderTextWithBoldAndHeaders(summaryContent)}
      </View>
      <View style={styles.footer}>
        <Text>Esse documento foi gerado automaticamente pelo ResumeAI.</Text>
      </View>
    </Page>
  </Document>
);

const App = ({ id, summaryContent }: { id: number, summaryContent: string }) => (
  <div style={styles.viewerContainer}>
    <PDFViewer style={styles.viewer}>
      <MyDocument id={id} summaryContent={summaryContent} />
    </PDFViewer>
  </div>
);

export { App, MyDocument };