<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="xml" version="1.0" encoding="UTF-8" doctype-system="http://people.ee.ethz.ch/~maroggo/musik/schrumm.dtd"/>

<xsl:template match="/">

<xsl:processing-instruction name="xml-stylesheet">href="http://people.ee.ethz.ch/~maroggo/musik/schrumm.css"</xsl:processing-instruction>

<songsheet>
	<xsl:apply-templates />
</songsheet>
</xsl:template>

<xsl:template match="div[@id='info']">
 <info>
	<xsl:apply-templates />
 </info>
</xsl:template>

<xsl:template match="h1">
  <title><xsl:value-of select="." /></title>
</xsl:template>

<xsl:template match="h2">
  <composer><xsl:value-of select="." /></composer>
</xsl:template>

<xsl:template match="h3[@id='hkey']">
  <key>
  	<xsl:attribute name="original"><xsl:value-of select="span[@id='key_orig']" /></xsl:attribute>
  	<chord><xsl:attribute name="name"><xsl:value-of select="span[@id='key']" /></xsl:attribute></chord>
  </key>
</xsl:template>

<xsl:template match="h3[@id='hyear']">
  <year><xsl:value-of select="span" /></year>
</xsl:template>

<xsl:template match="h3[@id='hbeat']">
  <beat><xsl:value-of select="span" /></beat>
</xsl:template>

<xsl:template match="h3[@id='hcapo']">
  <capo><xsl:value-of select="span" /></capo>
</xsl:template>

<xsl:template match="h3[@id='hgenre']">
  <genre><xsl:value-of select="span" /></genre>
</xsl:template>

<xsl:template match="div[@id='tags']">
	<tags>
	<!--
  <xsl:variable name="tagsstring"><xsl:value-of select="." /></xsl:variable>
  <xsl:for-each select="str:tokenize($tagsstring,',\s')">
		<tag><xsl:value-of select="." /></tag>
  </xsl:for-each> -->
      <xsl:apply-templates />
  </tags>
</xsl:template>

<xsl:template match="div[@id='tags']/span">
 <tag><xsl:value-of select="." /></tag>
</xsl:template>

<xsl:template match="div[@id='song']">
 <song>
	<xsl:apply-templates />
 </song>
</xsl:template>

<xsl:template match="div[@id='song']/p">
 <stanza>
 	<xsl:attribute name="type"><xsl:value-of select="@class" /></xsl:attribute>
	<xsl:apply-templates />
 </stanza>
</xsl:template>
 
<xsl:template match="span[@class='edit chord']">
  <chord>
  	<xsl:attribute name="name"><xsl:value-of select="." /></xsl:attribute>
  </chord>
</xsl:template>

<xsl:template match="br">
  <br />
</xsl:template>

<xsl:template match="span[@class='note']">
  <note><xsl:value-of select="." /></note>
</xsl:template>

</xsl:stylesheet>