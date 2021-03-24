import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

const Home = () => (
  <Grid className="text-justify">
    <Row>
      <Col>
        <h3>
          CardaBase
          {' '}
          – Datababase of names, chromosome numbers, ploidy levels
          and genome sizes of the tribe Cardamineae
        </h3>
        <p>
          Database of names and published chromosome numbers, ploidy-level
          estimates and genome sizes of the tribe Cardamineae is established
          here. Currently the database comprises only data on the largest genus
          of the tribe, namely Cardamine. Data on the other genera of the tribe
          will be continuously added. The database comprises the list of
          accepted names and their synonyms (including places of publication,
          type localities, and type specimens, wherever information is
          available) reflecting the most recent taxonomic and phylogenetic
          studies. Currently the database includes almost 300 accepted names
          of species and infraspecific taxa, altogether nearly thousand names
          of taxa, including synonyms. It also includes data on 3701 chromosome
          number records, 750 DNA ploidy level records and 150 genome size
          records.
        </p>
        <p>
          Currently the database includes almost 300 accepted names
          of species and infraspecific taxa, altogether nearly thousand names
          of taxa, including synonyms. It also includes data on 3701 chromosome
          number records, 750 DNA ploidy level records and 150 genome size
          records.
        </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <h4>Recommended citation</h4>
        <p style={{ fontSize: 'smaller' }}>
          Karol Marhold, Matúš Kempa, Jaromír Kučera, Katarína Skokanová, Janka
          Smatanová, Barbora Šingliarová, Marek Šlenker, Judita Zozomová-Lihová
          (2021+): Datababase of names, chromosome numbers, ploidy levels and
          genome sizes of the tribe Cardamineae. Available at:
          https://cardamine.sav.sk
        </p>
      </Col>
    </Row>
  </Grid>
);

export default Home;
